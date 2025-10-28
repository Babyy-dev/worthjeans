const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

function getToken() {
  return localStorage.getItem("token");
}

async function request(path: string, options: RequestInit = {}) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers: { ...headers, ...(options.headers || {}) } });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Request failed (${res.status})`);
  }
  return res.json();
}

export const api = {
  get: (path: string) => request(path, { method: "GET" }),
  post: (path: string, body?: any) => request(path, { method: "POST", body: JSON.stringify(body || {}) }),
  put: (path: string, body?: any) => request(path, { method: "PUT", body: JSON.stringify(body || {}) }),
  delete: (path: string) => request(path, { method: "DELETE" }),
  upload: async (path: string, file: File) => {
    const token = getToken();
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      body: form,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Upload failed (${res.status})`);
    }
    return res.json();
  }
};
