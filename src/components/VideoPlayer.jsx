import React, {useState, useEffect} from "react";

// Sirf known embed-hosts (YouTube, Vimeo, etc.) ke liye iframe use karo.
// Baaki har cheez (apna backend, blob, data URL, ya bina-extension wali
// file link) ek native <video> tag mein chalayenge — ye sabse zyada
// reliable hai kyunki hume server ka Content-Type pata nahi hota.
function isEmbedUrl(url) {
  return /(youtube\.com|youtu\.be|vimeo\.com|player\.vimeo)/i.test(url || "");
}

export default function VideoPlayer({src, poster, title}) {
  const [failed, setFailed] = useState(false);
  const url = src || "";

  useEffect(() => {
    setFailed(false);
  }, [url]);

  if (!url) {
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-white/10 flex items-center justify-center">
        <p className="text-sm text-mist-400 px-6 text-center">Is video ke liye koi source link nahi mila.</p>
      </div>
    );
  }

  if (isEmbedUrl(url)) {
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
        <iframe src={url} title={title} className="w-full h-full" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      </div>
    );
  }

  if (failed) {
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-white/10 flex flex-col items-center justify-center gap-2 p-6 text-center">
        <p className="text-sm text-mist-300">Ye video load nahi ho paya.</p>
        <p className="text-xs text-mist-500 break-all">Link check karein ya backend/hosting reachable hai ya nahi confirm karein.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
      <video key={url} src={url} poster={poster || undefined} className="w-full h-full object-contain" controls playsInline preload="metadata" onError={() => setFailed(true)} />
    </div>
  );
}
