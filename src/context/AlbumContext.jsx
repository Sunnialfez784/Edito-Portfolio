import React, {createContext, useContext, useEffect, useState, useCallback, useRef} from "react";
import {BASE_URL} from "../apis";

const AlbumContext = createContext(null);

// Legacy key from the old localStorage-only implementation. Kept only so any
// data saved before this fix can be migrated into the new store instead of
// being lost.
const LEGACY_STORAGE_KEY = "rehann_portfolio_albums_v1";

// Albums (and every video/cover inside them) can contain large base64 video
// data URLs from uploads. localStorage has a hard ~5-10MB per-origin quota,
// which real video uploads blow past almost immediately — the previous
// implementation wrote to localStorage and silently swallowed the resulting
// QuotaExceededError, so uploads looked like they worked in the Admin tab
// but were never actually persisted, and disappeared from the Public
// Portfolio on refresh or in any other tab/session. IndexedDB has a much
// larger quota and is the right place to store this data.
const DB_NAME = "rehann_portfolio_db";
const DB_VERSION = 1;
const STORE_NAME = "kv";
const RECORD_KEY = "albums";

// Broadcasts changes to any other open tab/window of this site (e.g. Admin
// open in one tab, Public Portfolio open in another) so both stay in sync
// immediately, without requiring a manual refresh.
const CHANNEL_NAME = "rehann_portfolio_albums_sync";

function normalizeVideo(video) {
  if (!video) return video;

  const src = video.src || video.link || "";
  const poster = video.poster || video.thumbnail || "";

  return {
    ...video,
    src,
    poster,
    link: src,
    thumbnail: poster,
  };
}

function normalizeAlbum(album) {
  if (!album) return album;

  // Backend flat "videoUrl" field ko coverVideo object mein map karo
  const rawCoverVideo =
    album.coverVideo ||
    (album.videoUrl
      ? {
          src: album.videoUrl,
          poster: album.poster || album.thumbnail || "",
          name: album.title || album.name,
          type: "video/mp4",
        }
      : null);

  const coverPoster = rawCoverVideo?.poster || album.cover || "";

  return {
    ...album,
    name: album.title || "Untitled Album",
    description: album.description || "",
    date: album.createdAt || "",
    coverVideo: rawCoverVideo ? normalizeVideo(rawCoverVideo) : coverPoster ? {src: "", poster: coverPoster, name: album.name, type: "image"} : null,
    videos: Array.isArray(album.videos) ? album.videos.map(normalizeVideo) : [],
  };
}

function openDB() {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("IndexedDB unavailable"));
      return;
    }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function idbGet(key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const req = tx.objectStore(STORE_NAME).get(key);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function idbSet(key, value) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).put(value, key);
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
}

// Best-effort fallback for the rare environment without IndexedDB (e.g. some
// locked-down private browsing modes). Same quota caveats as before apply
// there, but every modern browser used for real admin/public testing
// supports IndexedDB, so this path is a safety net rather than the norm.
async function fallbackGet(key) {
  const raw = localStorage.getItem(`${DB_NAME}:${key}`);
  return raw ? JSON.parse(raw) : undefined;
}
async function fallbackSet(key, value) {
  localStorage.setItem(`${DB_NAME}:${key}`, JSON.stringify(value));
  return true;
}

async function storeGet(key) {
  try {
    return await idbGet(key);
  } catch (e) {
    return fallbackGet(key);
  }
}
async function storeSet(key, value) {
  try {
    return await idbSet(key, value);
  } catch (e) {
    return fallbackSet(key, value);
  }
}

async function loadAlbums() {
  try {
    const stored = await storeGet(RECORD_KEY);
    if (Array.isArray(stored)) return stored.map(normalizeAlbum);
  } catch (e) {
    console.warn("Failed to read albums from storage", e);
  }

  // One-time migration: bring across anything saved by the old
  // localStorage-only implementation before it's overwritten.
  try {
    const raw = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (raw) {
      const migrated = JSON.parse(raw).map(normalizeAlbum);
      localStorage.removeItem(LEGACY_STORAGE_KEY);
      return migrated;
    }
  } catch (e) {
    console.warn("Failed to migrate legacy albums data", e);
  }

  return [];
}

export function AlbumProvider({children}) {
  const [albums, setAlbums] = useState([]);
  const [ready, setReady] = useState(false);
  const channelRef = useRef(null);
  const isRemoteUpdate = useRef(false);

  // Initial load from the shared store.
  useEffect(() => {
    const getAlbums = async () => {
      try {
        const response = await fetch(`${BASE_URL}/all-video`);
        const data = await response.json();

        if (response.ok) {
          const normalized = Array.isArray(data.data) ? data.data.map(normalizeAlbum) : [];
          setAlbums(normalized);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setReady(true);
      }
    };
    getAlbums();
  }, []);

  // Cross-tab live sync: when Admin (in one tab) changes data, any other
  // tab showing the Public Portfolio re-reads the shared store immediately.
  useEffect(() => {
    if (typeof BroadcastChannel === "undefined") return;
    const channel = new BroadcastChannel(CHANNEL_NAME);
    channelRef.current = channel;
    channel.onmessage = (event) => {
      if (event?.data?.type !== "albums-updated") return;
      storeGet(RECORD_KEY).then((stored) => {
        if (!Array.isArray(stored)) return;
        isRemoteUpdate.current = true;
        setAlbums(stored.map(normalizeAlbum));
      });
    };
    return () => channel.close();
  }, []);

  // Persist every change to the shared store, and let other tabs know.
  useEffect(() => {
    if (!ready) return;
    storeSet(RECORD_KEY, albums)
      .then(() => {
        if (!isRemoteUpdate.current) {
          channelRef.current?.postMessage({type: "albums-updated"});
        }
        isRemoteUpdate.current = false;
      })
      .catch((e) => console.warn("Failed to persist albums", e));
  }, [albums, ready]);

  const createAlbum = async (album) => {
    try {
      const formData = new FormData();
      formData.append("name", album.name || "");
      formData.append("title", album.name || "");
      formData.append("description", album.description || "");
      formData.append("type", album.type || "");

      if (album.coverVideo?.file) {
        formData.append("videoFile", album.coverVideo.file);
      }
      if (album.coverVideo?.poster) {
        formData.append("posterImage", album.coverVideo.poster);
      }

      if (Array.isArray(album.videos)) {
        album.videos.forEach((video) => {
          if (video.file) {
            formData.append("videoFile", video.file);
          }
          if (video.poster) {
            formData.append("posterImage", video.poster);
          }
        });
      }

      const response = await fetch(`${BASE_URL}/add-video`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        console.log("Create album failed:", data.message || data);
        alert(data.message || "Album create nahi ho paya. Console check karein.");
        return;
      }

      setAlbums((prev) => [normalizeAlbum(data.data), ...prev]);
    } catch (error) {
      console.log(error);
      alert("Album create karte waqt error aayi. Backend chal raha hai ya nahi check karein.");
    }
  };

  const updateAlbum = async (id, patch) => {
    try {
      const hasNewFile = !!patch.coverVideo?.file;
      let response;

      if (hasNewFile) {
        const formData = new FormData();
        formData.append("name", patch.name || "");
        formData.append("title", patch.name || "");
        formData.append("description", patch.description || "");
        formData.append("videoFile", patch.coverVideo.file);
        if (patch.coverVideo.poster) {
          formData.append("posterImage", patch.coverVideo.poster);
        }
        response = await fetch(`${BASE_URL}/edit-video/${id}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        response = await fetch(`${BASE_URL}/edit-video/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: patch.name,
            title: patch.name,
            description: patch.description,
          }),
        });
      }

      const data = await response.json();

      if (!response.ok) {
        console.log("Update album failed:", data.message || data);
        alert(data.message || "Album update nahi ho paya. Console check karein.");
        return;
      }

      setAlbums((prev) => prev.map((a) => (a.id === id ? normalizeAlbum(data.data) : a)));
    } catch (error) {
      console.log(error);
      alert("Album update karte waqt error aayi.");
    }
  };

  const deleteAlbum = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/delete-video/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setAlbums((prev) => prev.filter((a) => a.id !== id));
      } else {
        const data = await response.json().catch(() => ({}));
        alert(data.message || "Album delete nahi ho paya.");
      }
    } catch (error) {
      console.log(error);
      alert("Album delete karte waqt error aayi.");
    }
  };

  const addVideo = useCallback((albumId, video) => {
    setAlbums((prev) =>
      prev.map((a) =>
        a.id === albumId
          ? {
              ...a,
              videos: [
                {
                  id: crypto.randomUUID(),
                  date: new Date().toISOString().slice(0, 10),
                  ...normalizeVideo(video),
                },
                ...a.videos,
              ],
            }
          : a,
      ),
    );
  }, []);

  const updateVideo = useCallback((albumId, videoId, patch) => {
    setAlbums((prev) => prev.map((a) => (a.id === albumId ? {...a, videos: a.videos.map((v) => (v.id === videoId ? {...v, ...patch} : v))} : a)));
  }, []);

  const deleteVideo = useCallback((albumId, videoId) => {
    setAlbums((prev) => prev.map((a) => (a.id === albumId ? {...a, videos: a.videos.filter((v) => v.id !== videoId)} : a)));
  }, []);

  return <AlbumContext.Provider value={{albums, createAlbum, updateAlbum, deleteAlbum, addVideo, updateVideo, deleteVideo}}>{children}</AlbumContext.Provider>;
}

export function useAlbums() {
  const ctx = useContext(AlbumContext);
  if (!ctx) throw new Error("useAlbums must be used within AlbumProvider");
  return ctx;
}
