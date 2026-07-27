import React, { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiPlus, FiEdit2, FiTrash2, FiCalendar, FiTag, FiX, FiPlay } from 'react-icons/fi'
import { useAlbums } from '../context/AlbumContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import VideoFormModal from '../components/VideoFormModal.jsx'
import ConfirmDialog from '../components/ConfirmDialog.jsx'
import VideoPlayer from '../components/VideoPlayer.jsx'
import Reveal from '../components/Reveal.jsx'
import BackgroundFX from '../components/BackgroundFX.jsx'

export default function AlbumDetail() {
  const { id } = useParams()
  const { albums, addVideo, updateVideo, deleteVideo } = useAlbums()
  const { isAuthenticated } = useAuth()
  const album = albums.find((a) => a.id === id)

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [toDelete, setToDelete] = useState(null)
  const [preview, setPreview] = useState(null)

  if (!album) return <Navigate to="/404" replace />

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative pt-32 min-h-screen"
    >
      <BackgroundFX />
      <div className="relative section-pad !py-0 pb-24">
        <Link
          to="/#albums"
          onClick={() => setTimeout(() => document.querySelector('#albums')?.scrollIntoView({ behavior: 'smooth' }), 50)}
          className="inline-flex items-center gap-2 text-sm text-mist-500 hover:text-white mb-8 transition-colors"
        >
          <FiArrowLeft /> Back to Albums
        </Link>

        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="eyebrow mb-3">{album.videos.length} videos · {album.date}</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">{album.name}</h1>
            <p className="text-mist-500 max-w-xl">{album.description}</p>
          </div>
          {isAuthenticated && (
            <button
              onClick={() => {
                setEditing(null)
                setModalOpen(true)
              }}
              data-cursor-hover
              className="btn-primary shrink-0"
            >
              <FiPlus /> Add Video
            </button>
          )}
        </Reveal>

        {album.videos.length === 0 ? (
          <div className="card p-16 text-center text-mist-500">
            No videos in this album yet. Click "Add Video" to get started.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {album.videos.map((v, i) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                whileHover={{ y: -8 }}
                className="card overflow-hidden group"
              >
                <button
                  onClick={() => setPreview(v)}
                  data-cursor-hover
                  className="relative aspect-video w-full overflow-hidden block"
                >
                  <img
                    src={v.poster || v.thumbnail || "/default-video-poster.svg"}
                    alt={v.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <span className="w-12 h-12 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <FiPlay size={18} className="ml-0.5" />
                    </span>
                  </div>
                  <span className="absolute top-3 left-3 timecode glass px-2.5 py-1 rounded-full flex items-center gap-1.5">
                    <FiTag size={11} /> {v.category}
                  </span>
                </button>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-base leading-snug">{v.title}</h3>
                    {isAuthenticated && (
                      <div className="flex gap-1.5 shrink-0">
                        <button
                          onClick={() => {
                            setEditing(v)
                            setModalOpen(true)
                          }}
                          aria-label="Edit video"
                          data-cursor-hover
                          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-violet-500/20 text-mist-500 hover:text-violet-300 flex items-center justify-center transition-colors"
                        >
                          <FiEdit2 size={13} />
                        </button>
                        <button
                          onClick={() => setToDelete(v)}
                          aria-label="Delete video"
                          data-cursor-hover
                          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 text-mist-500 hover:text-red-400 flex items-center justify-center transition-colors"
                        >
                          <FiTrash2 size={13} />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-mist-500 mt-2 line-clamp-2">{v.description}</p>
                  <div className="flex items-center gap-1.5 timecode mt-4">
                    <FiCalendar size={11} /> {v.date}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {isAuthenticated && (
        <>
          <VideoFormModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            initial={editing}
            onSubmit={(data) => (editing ? updateVideo(album.id, editing.id, data) : addVideo(album.id, data))}
          />

          <ConfirmDialog
            open={!!toDelete}
            title="Delete this video?"
            message={`"${toDelete?.title}" will be permanently removed from this album.`}
            onCancel={() => setToDelete(null)}
            onConfirm={() => {
              deleteVideo(album.id, toDelete.id)
              setToDelete(null)
            }}
          />
        </>
      )}

      {preview && (
        <div
          className="fixed inset-0 z-[97] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          onClick={() => setPreview(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl"
          >
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-display">{preview.title}</h4>
              <button onClick={() => setPreview(null)} className="text-mist-400 hover:text-white">
                <FiX size={22} />
              </button>
            </div>
            <VideoPlayer src={preview.src || preview.link} poster={preview.poster || preview.thumbnail} title={preview.title} />
          </motion.div>
        </div>
      )}
    </motion.main>
  )
}
