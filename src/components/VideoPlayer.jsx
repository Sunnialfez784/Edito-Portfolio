import React from "react";

function isDirectVideo(url) {
  return /^(data:video\/|blob:|.*\.(mp4|webm|mov|avi)(\?.*)?$)/i.test(url);
}

export default function VideoPlayer({src, poster, title}) {
  const direct = isDirectVideo(src || "");

  if (!direct) {
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
        <iframe src={src} title={title} className="w-full h-full" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
      <video src={src} poster={poster || "/default-video-poster.svg"} className="w-full h-full object-contain" controls playsInline />
    </div>
  );
}
