import React, {useEffect, useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {FiX} from "react-icons/fi";
import {prepareVideoAsset, VIDEO_ACCEPT} from "../utils/videoMedia.js";

const EMPTY = {name: "", description: "", coverVideo: null};

export default function AlbumFormModal({open, onClose, onSubmit, initial}) {
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setForm(
      initial
        ? {
            name: initial.name,
            description: initial.description,
            coverVideo: initial.coverVideo || null,
          }
        : EMPTY,
    );
    setLoading(false);
    setError("");
  }, [initial, open]);

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError("");

    try {
      const asset = await prepareVideoAsset(file);
      setForm((current) => ({
        ...current,
        coverVideo: {
          ...asset,
          file, // 👈 ye line add karo — original File object bhi rakho
          fileName: file.name,
        },
      }));
    } catch (caughtError) {
      setError("Could not read that video file. Please try another file.");
    } finally {
      setLoading(false);
      event.target.value = "";
    }
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    if (!form.coverVideo && !initial?.coverVideo) {
      setError("Upload a video file for the album preview.");
      return;
    }
    onSubmit({
      name: form.name.trim(),
      description: form.description,
      coverVideo: form.coverVideo || initial?.coverVideo || null, // 👈 ye poora object jaata hai (file sahit ab)
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[95] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} onClick={onClose}>
          <motion.form onSubmit={submit} onClick={(e) => e.stopPropagation()} initial={{opacity: 0, scale: 0.92, y: 20}} animate={{opacity: 1, scale: 1, y: 0}} exit={{opacity: 0, scale: 0.92, y: 20}} transition={{duration: 0.3, ease: [0.22, 1, 0.36, 1]}} className="w-[calc(100vw-2rem)] max-w-md card p-6 sm:p-7 relative">
            <button type="button" onClick={onClose} className="absolute top-4 right-4 text-mist-500 hover:text-white" aria-label="Close">
              <FiX size={20} />
            </button>
            <h3 className="font-display text-xl mb-6">{initial ? "Edit Album" : "Create New Album"}</h3>

            <label className="block text-xs text-mist-500 mb-1.5">Album Name</label>
            <input required value={form.name} onChange={(e) => setForm((f) => ({...f, name: e.target.value}))} placeholder="e.g. Cinematic Brand Films" className="w-full mb-4 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-violet-400 outline-none" />

            <label className="block text-xs text-mist-500 mb-1.5">Description</label>
            <textarea value={form.description} onChange={(e) => setForm((f) => ({...f, description: e.target.value}))} placeholder="What kind of work lives in this album?" rows={3} className="w-full mb-4 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-violet-400 outline-none resize-none" />

            <label className="block text-xs text-mist-500 mb-1.5">Album Video File</label>
            <input type="file" accept={VIDEO_ACCEPT} onChange={handleFile} className="w-full mb-3 text-sm text-mist-400 file:mr-4 file:rounded-full file:border-0 file:bg-white/5 file:px-4 file:py-2.5 file:text-mist-100 hover:file:bg-white/10" />
            <p className="text-xs text-mist-500 mb-4">MP4, MOV, AVI, or WEBM. The first frame becomes the preview thumbnail.</p>

            {form.coverVideo?.poster ? (
              <div className="mb-4 rounded-xl overflow-hidden border border-white/10 bg-black/30">
                <img src={form.coverVideo.poster} alt="Album preview" className="w-full aspect-video object-cover" />
              </div>
            ) : null}

            {loading && <p className="text-xs text-mist-500 mb-4">Processing video preview...</p>}
            {error && <p className="text-xs text-red-400 mb-4">{error}</p>}

            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
              {initial ? "Save Changes" : "Create Album"}
            </button>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
