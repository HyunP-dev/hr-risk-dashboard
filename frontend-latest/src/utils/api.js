// utils/api.js
const BASE_URL = "https://mini-team2-home-project.onrender.com";

export async function apiFetch(endpoint, options = {}) {
  return fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
  });
}
