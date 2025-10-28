export function setToken(token: string | null) {
  if (token) localStorage.setItem('token', token);
  else localStorage.removeItem('token');
}

export function getToken() {
  return localStorage.getItem('token');
}
