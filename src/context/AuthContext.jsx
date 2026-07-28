import React, {createContext, useContext, useState, useEffect, useCallback} from "react";
import {getAllVideos, addVideoApi, editVideoApi, deleteVideoApi} from "../apis/videos.js";

const VideoContext = createContext(null);

function normalize(v) {
  return {
    id: v.id,
    title: v.title || "",
    description: v.description || "",
    src: v.videoUrl,
    date: (v.createdAt || "").slice(0, 10),
  };
}

export function VideoProvider({children}) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAllVideos();
      setVideos(data.map(normalize));
    } catch (e) {
      setError(e.message || "Failed to load videos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addVideo = useCallback(
    async ({title, description, file}) => {
      const created = await addVideoApi({title, description, file});
      if (created) {
        setVideos((prev) => [normalize(created), ...prev]);
      } else {
        await refresh();
      }
    },
    [refresh],
  );

  const updateVideo = useCallback(
    async (id, {title, description, file}) => {
      const updated = await editVideoApi(id, {title, description, file});
      if (updated) {
        setVideos((prev) => prev.map((v) => (v.id === id ? normalize(updated) : v)));
      } else {
        await refresh();
      }
    },
    [refresh],
  );

  const removeVideo = useCallback(async (id) => {
    await deleteVideoApi(id);
    setVideos((prev) => prev.filter((v) => v.id !== id));
  }, []);

  return <VideoContext.Provider value={{videos, loading, error, refresh, addVideo, updateVideo, removeVideo}}>{children}</VideoContext.Provider>;
}

export function useVideos() {
  const ctx = useContext(VideoContext);
  if (!ctx) throw new Error("useVideos must be used within VideoProvider");
  return ctx;
}
