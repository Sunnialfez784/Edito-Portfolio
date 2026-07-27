import React, {useEffect, useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {FiX} from "react-icons/fi";
import {prepareVideoAsset, VIDEO_ACCEPT} from "../utils/videoMedia.js";

const EMPTY = {title: "", description: "", category: "YouTube", video: null};
const CATEGORIES = ["YouTube", "Reels", "Commercial", "Corporate", "Wedding", "Podcast", "AI Generated"];

export default function VideoFormModal({open, onClose, onSubmit, initial}) {
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setForm(
      initial
        ? {
            title: initial.title,
            description: initial.description,
            category: initial.category,
            video: initial.src
              ? {
                  src: initial.src,
                  poster: initial.poster || initial.thumbnail || "",
                  name: initial.fileName || initial.title,
                  type: initial.type || "",
                }
              : null,
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
        video: {
          ...asset,
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
    if (!form.title.trim()) return;
    if (!form.video && !(initial?.src || initial?.link)) {
      setError("Upload a video file for this entry.");
      return;
    }
    onSubmit({
      title: form.title.trim(),
      description: form.description,
      category: form.category,
      src: form.video?.src || initial?.src || initial?.link || "",
      poster: form.video?.poster || initial?.poster || initial?.thumbnail || "",
      fileName: form.video?.fileName || initial?.fileName || initial?.title,
      type: form.video?.type || initial?.type || "",
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[95] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} onClick={onClose}>
          <motion.form onSubmit={submit} onClick={(e) => e.stopPropagation()} initial={{opacity: 0, scale: 0.92, y: 20}} animate={{opacity: 1, scale: 1, y: 0}} exit={{opacity: 0, scale: 0.92, y: 20}} transition={{duration: 0.3, ease: [0.22, 1, 0.36, 1]}} className="w-[calc(100vw-2rem)] max-w-md card p-6 sm:p-7 relative max-h-[90vh] overflow-y-auto no-scrollbar">
            <button type="button" onClick={onClose} className="absolute top-4 right-4 text-mist-500 hover:text-white" aria-label="Close">
              <FiX size={20} />
            </button>
            <h3 className="font-display text-xl mb-6">{initial ? "Edit Video" : "Add Video"}</h3>

            <label className="block text-xs text-mist-500 mb-1.5">Video Title</label>
            <input required value={form.title} onChange={(e) => setForm((f) => ({...f, title: e.target.value}))} placeholder="e.g. Product Launch Film" className="w-full mb-4 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-violet-400 outline-none" />

            <label className="block text-xs text-mist-500 mb-1.5">Description</label>
            <textarea value={form.description} onChange={(e) => setForm((f) => ({...f, description: e.target.value}))} rows={3} className="w-full mb-4 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-violet-400 outline-none resize-none" />

            <label className="block text-xs text-mist-500 mb-1.5">Category</label>
            <select value={form.category} onChange={(e) => setForm((f) => ({...f, category: e.target.value}))} className="w-full mb-4 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-violet-400 outline-none text-mist-200">
              {CATEGORIES.map((c) => (
                <option key={c} value={c} className="bg-ink-800">
                  {c}
                </option>
              ))}
            </select>

            <label className="block text-xs text-mist-500 mb-1.5">Video File</label>
            <input type="file" accept={VIDEO_ACCEPT} onChange={handleFile} className="w-full mb-3 text-sm text-mist-400 file:mr-4 file:rounded-full file:border-0 file:bg-white/5 file:px-4 file:py-2.5 file:text-mist-100 hover:file:bg-white/10" />
            <p className="text-xs text-mist-500 mb-4">MP4, MOV, AVI, or WEBM. The first frame becomes the preview thumbnail.</p>

            {form.video?.poster ? (
              <div className="mb-4 rounded-xl overflow-hidden border border-white/10 bg-black/30">
                <img src={form.video.poster} alt="Video preview" className="w-full aspect-video object-cover" />
              </div>
            ) : form.video ? (
              <div className="mb-4 rounded-xl overflow-hidden border border-white/10 bg-black/30 aspect-video flex items-center justify-center">
                <p className="text-xs text-mist-500 text-center px-4">Thumbnail generate nahi ho payi — video format shayad ye browser support nahi karta. Video phir bhi save ho jayega.</p>
              </div>
            ) : null}

            {loading && <p className="text-xs text-mist-500 mb-4">Processing video preview...</p>}
            {error && <p className="text-xs text-red-400 mb-4">{error}</p>}

            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
              {initial ? "Save Changes" : "Add Video"}
            </button>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
