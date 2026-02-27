/**
 * Central API client with ngrok-skip-browser-warning header.
 * Use this instead of native fetch() for all API requests.
 */

const DEFAULT_HEADERS: HeadersInit = {
  'Content-Type': 'application/json',
  'ngrok-skip-browser-warning': 'true',
};

type FetchOptions = Omit<RequestInit, 'headers'> & {
  headers?: Record<string, string>;
};

export async function apiFetch(url: string, options: FetchOptions = {}): Promise<Response> {
  const { headers: extraHeaders, ...restOptions } = options;

  return fetch(url, {
    ...restOptions,
    headers: {
      ...DEFAULT_HEADERS,
      ...extraHeaders,
    },
  });
}

export async function apiGet<T>(url: string, options: FetchOptions = {}): Promise<T> {
  const response = await apiFetch(url, { ...options, method: 'GET' });
  if (!response.ok) {
    throw new Error(`GET ${url} failed: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

export async function apiPost<T>(url: string, body: unknown, options: FetchOptions = {}): Promise<T> {
  const response = await apiFetch(url, {
    ...options,
    method: 'POST',
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`POST ${url} failed: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}
