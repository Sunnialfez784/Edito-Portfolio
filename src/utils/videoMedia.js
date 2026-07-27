export const VIDEO_ACCEPT = ".mp4,.webm,video/mp4,video/webm";
// .avi aur .mov hata diya kyunki inke codecs browser mein reliably decode nahi hote

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error || new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

function isBlankFrame(canvas) {
  const ctx = canvas.getContext("2d");
  const {data} = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let sum = 0;
  for (let i = 0; i < data.length; i += 40) {
    sum += data[i] + data[i + 1] + data[i + 2];
  }
  return sum < 500;
}

function captureFirstFrame(file) {
  return new Promise((resolve) => {
    const objectUrl = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;
    video.src = objectUrl;

    let settled = false;
    let timeoutId;

    const cleanup = () => {
      clearTimeout(timeoutId);
      URL.revokeObjectURL(objectUrl);
      video.removeAttribute("src");
      video.load();
    };

    // NEVER rejects — always resolves, either with a dataURL or null.
    // This guarantees the "Processing video preview..." UI can never hang forever.
    const finish = (result) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(result);
    };

    const drawFrame = () => {
      if (settled) return;
      try {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth || 1280;
        canvas.height = video.videoHeight || 720;
        const context = canvas.getContext("2d");
        if (!context) {
          finish(null);
          return;
        }
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        finish(isBlankFrame(canvas) ? null : canvas.toDataURL("image/jpeg", 0.82));
      } catch (error) {
        finish(null);
      }
    };

    video.onloadedmetadata = () => {
      const duration = video.duration || 0;
      const targetTime = duration > 1 ? Math.min(duration * 0.05, 1.5) : 0;
      try {
        video.currentTime = targetTime;
      } catch (error) {
        // Seeking not supported for this file — try drawing whatever is loaded.
        drawFrame();
      }
    };

    // requestVideoFrameCallback ko hata diya — Chrome mein ye seek-only
    // (non-playing) videos ke saath kabhi fire hi nahi hota, jisse promise
    // hamesha ke liye latak jaata tha. Do animation-frame ka wait usually
    // kaafi hota hai frame paint hone ke liye.
    video.onseeked = () => {
      requestAnimationFrame(() => requestAnimationFrame(drawFrame));
    };

    // Fallback path agar onseeked kabhi fire na ho (e.g. targetTime 0).
    video.onloadeddata = () => {
      if (video.readyState >= 2) {
        setTimeout(drawFrame, 50);
      }
    };

    video.onerror = () => finish(null);

    // Hard safety net: chahe kuch bhi ho jaaye, 4 second ke andar resolve
    // ho hi jaayega — UI kabhi permanently "Processing..." pe nahi atkega.
    timeoutId = setTimeout(() => finish(null), 4000);
  });
}

export async function prepareVideoAsset(file) {
  const [src, poster] = await Promise.all([readFileAsDataUrl(file), captureFirstFrame(file)]);
  return {
    src,
    poster, // null ho sakta hai agar codec unsupported hai
    name: file.name,
    type: file.type,
    size: file.size,
  };
}
