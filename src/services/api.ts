const BASE_URL = '/api';

function getToken(): string | null {
  return localStorage.getItem('equity_flow_token');
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  requiresAuth = true
): Promise<T> {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (requiresAuth) {
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.detail || data.message || `HTTP ${res.status}`);
  return data as T;
}

export const api = {
  get: <T>(path: string, requiresAuth = true) =>
    request<T>('GET', path, undefined, requiresAuth),
  post: <T>(path: string, body: unknown, requiresAuth = false) =>
    request<T>('POST', path, body, requiresAuth),
  put: <T>(path: string, body: unknown) =>
    request<T>('PUT', path, body, true),
  del: <T>(path: string, body?: unknown) =>
    request<T>('DELETE', path, body, true),
};
