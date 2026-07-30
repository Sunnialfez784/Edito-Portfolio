import React, {useMemo, useState} from "react";
import {motion} from "framer-motion";
import {FiSearch, FiPlus, FiEdit2, FiTrash2, FiCalendar, FiPlay, FiX} from "react-icons/fi";
import {useVideos} from "../context/VideoContext.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import Reveal from "./Reveal.jsx";
import VideoFormModal from "./VideoFormModal.jsx";
import ConfirmDialog from "./ConfirmDialog.jsx";
import VideoPlayer from "./VideoPlayer.jsx";

export default function Albums() {
  const {videos, loading, error, addVideo, updateVideo, removeVideo} = useVideos();
  const {isAuthenticated} = useAuth();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [preview, setPreview] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  const filtered = useMemo(() => {
    let list = videos.filter((v) => (v.title || "").toLowerCase().includes(query.toLowerCase()) || (v.description || "").toLowerCase().includes(query.toLowerCase()));
    if (sort === "newest") list = [...list].sort((a, b) => new Date(b.date) - new Date(a.date));
    if (sort === "oldest") list = [...list].sort((a, b) => new Date(a.date) - new Date(b.date));
    if (sort === "az") list = [...list].sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    return list;
  }, [videos, query, sort]);

  return (
    <section id="albums" className="relative section-pad">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <Reveal>
          <p className="eyebrow mb-4">00:04:45 — Portfolio</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Explore my <span className="grad-text">videos</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          {isAuthenticated && (
            <button
              onClick={() => {
                setEditing(null);
                setModalOpen(true);
              }}
              data-cursor-hover
              className="btn-primary">
              <FiPlus /> Add Video
            </button>
          )}
        </Reveal>
      </div>

      <Reveal delay={0.15} className="flex flex-col sm:flex-row gap-4 mb-10">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-mist-500" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search videos..." className="w-full bg-white/5 border border-white/10 rounded-full pl-11 pr-4 py-3 text-sm focus:border-violet-400 outline-none" />
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-white/5 border border-white/10 rounded-full px-4 py-3 text-sm outline-none focus:border-violet-400 text-mist-300">
          <option value="newest" className="bg-ink-800">
            Newest First
          </option>
          <option value="oldest" className="bg-ink-800">
            Oldest First
          </option>
          <option value="az" className="bg-ink-800">
            A – Z
          </option>
        </select>
      </Reveal>

      {loading ? (
        <p className="text-mist-500 text-center py-20">Loading videos...</p>
      ) : error ? (
        <p className="text-red-400 text-center py-20">{error}</p>
      ) : filtered.length === 0 ? (
        <p className="text-mist-500 text-center py-20">No videos match your search.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((video, i) => (
            <motion.div key={video.id} layout initial={{opacity: 0, y: 30}} whileInView={{opacity: 1, y: 0}} viewport={{once: true, amount: 0.15}} transition={{duration: 0.5, delay: (i % 3) * 0.08}} whileHover={{y: -8}} className="card overflow-hidden group">
              <button onClick={() => setPreview(video)} data-cursor-hover className="block relative aspect-video overflow-hidden w-full text-left bg-black">
                <video src={video.src} className="w-full h-full object-cover" muted preload="metadata" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
                <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="w-14 h-14 rounded-full bg-white/10 border border-white/20 backdrop-blur flex items-center justify-center text-white">
                    <FiPlay size={22} className="ml-0.5" />
                  </span>
                </div>
              </button>

              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-display text-lg">{video.title}</p>
                  {isAuthenticated && (
                    <div className="flex gap-1.5 shrink-0">
                      <button
                        onClick={() => {
                          setEditing(video);
                          setModalOpen(true);
                        }}
                        aria-label="Edit video"
                        data-cursor-hover
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-violet-500/20 text-mist-500 hover:text-violet-300 flex items-center justify-center transition-colors">
                        <FiEdit2 size={13} />
                      </button>
                      <button
                        onClick={() => {
                          setDeleteError("");
                          setToDelete(video);
                        }}
                        aria-label="Delete video"
                        data-cursor-hover
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 text-mist-500 hover:text-red-400 flex items-center justify-center transition-colors">
                        <FiTrash2 size={13} />
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-sm text-mist-500 mt-2 line-clamp-2">{video.description}</p>
                {video.date && (
                  <div className="flex items-center gap-1.5 timecode mt-4">
                    <FiCalendar size={11} /> {video.date}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <VideoFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initial={editing}
        onSubmit={async (data) => {
          if (editing) {
            await updateVideo(editing.id, data);
          } else {
            await addVideo(data);
            window.location.reload(); // video upload hote hi page reload
          }
        }}
      />

      <ConfirmDialog
        open={!!toDelete}
        title="Delete this video?"
        message={`"${toDelete?.title}" will be permanently removed.`}
        onCancel={() => setToDelete(null)}
        onConfirm={async () => {
          try {
            await removeVideo(toDelete.id);
            setToDelete(null);
          } catch (e) {
            setDeleteError(e?.message || "Failed to delete video.");
          }
        }}
      />
      {deleteError && <p className="text-xs text-red-400 text-center mt-3">{deleteError}</p>}

      {preview && (
        <div className="fixed inset-0 z-[97] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm" onClick={() => setPreview(null)}>
          <motion.div initial={{opacity: 0, scale: 0.94}} animate={{opacity: 1, scale: 1}} onClick={(e) => e.stopPropagation()} className="w-full max-w-3xl">
            <div className="flex justify-between items-start gap-4 mb-3">
              <div>
                <h4 className="font-display text-lg">{preview.title}</h4>
                {preview.description && <p className="text-sm text-mist-400 mt-1 max-w-xl">{preview.description}</p>}
              </div>
              <button onClick={() => setPreview(null)} className="text-mist-400 hover:text-white shrink-0">
                <FiX size={22} />
              </button>
            </div>
            <VideoPlayer src={preview.src} title={preview.title} />
          </motion.div>
        </div>
      )}
    </section>
  );
}
