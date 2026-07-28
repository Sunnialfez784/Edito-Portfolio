import {BASE_URL} from "./index.js";

// NOTE: BASE_URL (VITE_BASE_URL) must point to the videos root, e.g.
// "https://videouploaded-production.up.railway.app/api/v1/videos"
// so that these become /add-video, /edit-video/:id, /delete-video/:id, /all-video.

async function handleResponse(res) {
  let body = null;
  try {
    body = await res.json();
  } catch (e) {
    // non-JSON response, fall through with body = null
  }
  if (!res.ok || (body && body.success === false)) {
    const message = body?.message || `Request failed (${res.status})`;
    throw new Error(message);
  }
  return body;
}

export async function getAllVideos() {
  const res = await fetch(`${BASE_URL}/all-video`);
  const body = await handleResponse(res);
  return Array.isArray(body?.data) ? body.data : [];
}

// file is optional here in theory, but the backend requires one on create.
export async function addVideoApi({title, description, file}) {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description || "");
  // 👈 field name assumption — if uploads 400/fail, check your multer/multipart
  // field name on the backend for POST /add-video and rename "video" to match.
  formData.append("video", file);

  const res = await fetch(`${BASE_URL}/add-video`, {
    method: "POST",
    body: formData,
  });
  const body = await handleResponse(res);
  return body?.data;
}

export async function editVideoApi(id, {title, description, file}) {
  const formData = new FormData();
  if (title !== undefined) formData.append("title", title);
  if (description !== undefined) formData.append("description", description || "");
  if (file) formData.append("video", file); // same field-name assumption as above

  const res = await fetch(`${BASE_URL}/edit-video/${id}`, {
    method: "PUT",
    body: formData,
  });
  const body = await handleResponse(res);
  return body?.data;
}

export async function deleteVideoApi(id) {
  const res = await fetch(`${BASE_URL}/delete-video/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res);
}
