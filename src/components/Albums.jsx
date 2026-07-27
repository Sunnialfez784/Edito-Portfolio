import React, {useMemo, useState} from "react";
import {motion} from "framer-motion";
import {Link} from "react-router-dom";
import {FiSearch, FiPlus, FiEdit2, FiTrash2, FiFilm, FiCalendar, FiPlay, FiX} from "react-icons/fi";
import {useAlbums} from "../context/AlbumContext.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import Reveal from "./Reveal.jsx";
import AlbumFormModal from "./AlbumFormModal.jsx";
import ConfirmDialog from "./ConfirmDialog.jsx";
import VideoPlayer from "./VideoPlayer.jsx";

export default function Albums() {
  const {albums, createAlbum, updateAlbum, deleteAlbum} = useAlbums();
  const {isAuthenticated} = useAuth();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [preview, setPreview] = useState(null);

  const filtered = useMemo(() => {
    let list = albums.filter((a) => (a.name || "").toLowerCase().includes(query.toLowerCase()) || (a.description || "").toLowerCase().includes(query.toLowerCase()));
    if (sort === "newest") list = [...list].sort((a, b) => new Date(b.date) - new Date(a.date));
    if (sort === "oldest") list = [...list].sort((a, b) => new Date(a.date) - new Date(b.date));
    if (sort === "az") list = [...list].sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    if (sort === "videos") list = [...list].sort((a, b) => (b.videos?.length || 0) - (a.videos?.length || 0));
    return list;
  }, [albums, query, sort]);

  return (
    <section id="albums" className="relative section-pad">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <Reveal>
          <p className="eyebrow mb-4">00:04:45 — Portfolio</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Explore my <span className="grad-text">albums</span>
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
              <FiPlus /> New Album
            </button>
          )}
        </Reveal>
      </div>

      <Reveal delay={0.15} className="flex flex-col sm:flex-row gap-4 mb-10">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-mist-500" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search albums..." className="w-full bg-white/5 border border-white/10 rounded-full pl-11 pr-4 py-3 text-sm focus:border-violet-400 outline-none" />
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
          <option value="videos" className="bg-ink-800">
            Most Videos
          </option>
        </select>
      </Reveal>

      {filtered.length === 0 ? (
        <p className="text-mist-500 text-center py-20">No albums match your search.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((album, i) => (
            <motion.div key={album.id} layout initial={{opacity: 0, y: 30}} whileInView={{opacity: 1, y: 0}} viewport={{once: true, amount: 0.15}} transition={{duration: 0.5, delay: (i % 3) * 0.08}} whileHover={{y: -8}} className="card overflow-hidden group">
              <button onClick={() => setPreview(album)} data-cursor-hover className="block relative aspect-[4/3] overflow-hidden w-full text-left">
                <img src={album.coverVideo?.poster || album.cover || "/default-video-poster.svg"} alt={album.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
                <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="w-14 h-14 rounded-full bg-white/10 border border-white/20 backdrop-blur flex items-center justify-center text-white">
                    <FiPlay size={22} className="ml-0.5" />
                  </span>
                </div>
                <span className="absolute top-3 left-3 timecode glass px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <FiFilm size={11} /> {album.videos.length} videos
                </span>
              </button>

              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <Link to={`/album/${album.id}`} className="font-display text-lg hover:text-violet-300 transition-colors">
                    {album.name}
                  </Link>
                  {isAuthenticated && (
                    <div className="flex gap-1.5 shrink-0">
                      <button
                        onClick={() => {
                          setEditing(album);
                          setModalOpen(true);
                        }}
                        aria-label="Edit album"
                        data-cursor-hover
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-violet-500/20 text-mist-500 hover:text-violet-300 flex items-center justify-center transition-colors">
                        <FiEdit2 size={13} />
                      </button>
                      <button onClick={() => setToDelete(album)} aria-label="Delete album" data-cursor-hover className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 text-mist-500 hover:text-red-400 flex items-center justify-center transition-colors">
                        <FiTrash2 size={13} />
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-sm text-mist-500 mt-2 line-clamp-2">{album.description}</p>
                <div className="flex items-center gap-1.5 timecode mt-4">
                  <FiCalendar size={11} /> {album.date}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AlbumFormModal open={modalOpen} onClose={() => setModalOpen(false)} initial={editing} onSubmit={(data) => (editing ? updateAlbum(editing.id, data) : createAlbum(data))} />

      <ConfirmDialog
        open={!!toDelete}
        title="Delete this album?"
        message={`"${toDelete?.name}" and all its videos will be permanently removed.`}
        onCancel={() => setToDelete(null)}
        onConfirm={() => {
          deleteAlbum(toDelete.id);
          setToDelete(null);
        }}
      />

      {preview && (
        <div className="fixed inset-0 z-[97] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm" onClick={() => setPreview(null)}>
          <motion.div initial={{opacity: 0, scale: 0.94}} animate={{opacity: 1, scale: 1}} onClick={(e) => e.stopPropagation()} className="w-full max-w-3xl">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-display">{preview.name}</h4>
              <button onClick={() => setPreview(null)} className="text-mist-400 hover:text-white">
                <FiX size={22} />
              </button>
            </div>
            {preview.coverVideo?.src ? <VideoPlayer src={preview.coverVideo.src} poster={preview.coverVideo.poster} title={preview.name} /> : <div className="rounded-xl overflow-hidden bg-black border border-white/10 aspect-video flex items-center justify-center text-mist-400 text-sm">This album preview is ready after a video is uploaded.</div>}
          </motion.div>
        </div>
      )}
    </section>
  );
}
