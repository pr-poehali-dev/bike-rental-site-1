const AUTH_URL = 'https://functions.poehali.dev/aac4ab19-0fee-469d-a790-7bdb456ca434';
const CONTENT_URL = 'https://functions.poehali.dev/a9ddd1c4-dc9f-414e-8392-1b32e92c10f3';

const TOKEN_KEY = 'velotropa_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t: string) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

function authHeaders(): Record<string, string> {
  const t = getToken();
  const h: Record<string, string> = { 'Content-Type': 'application/json' };
  if (t) h['X-Auth-Token'] = t;
  return h;
}

async function parse(res: Response) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Ошибка запроса');
  return data;
}

export type Role = 'user' | 'editor' | 'admin';
export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}

export const authApi = {
  login: (email: string, password: string) =>
    fetch(AUTH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login', email, password }),
    }).then(parse),

  register: (name: string, email: string, password: string) =>
    fetch(AUTH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'register', name, email, password }),
    }).then(parse),

  me: () =>
    fetch(`${AUTH_URL}?action=me`, { headers: authHeaders() }).then(parse),

  listUsers: () =>
    fetch(`${AUTH_URL}?action=users`, { headers: authHeaders() }).then(parse),

  updateUserRole: (id: number, role: Role) =>
    fetch(`${AUTH_URL}?action=users`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify({ id, role }),
    }).then(parse),
};

export type Resource =
  | 'bikes'
  | 'pricing'
  | 'reviews'
  | 'locations'
  | 'partners'
  | 'blog'
  | 'faqs'
  | 'bookings'
  | 'contacts';

export const contentApi = {
  list: <T = Record<string, unknown>>(resource: Resource): Promise<T[]> =>
    fetch(`${CONTENT_URL}?resource=${resource}`, { headers: authHeaders() })
      .then(parse)
      .then((d) => d.items as T[]),

  create: (resource: Resource, data: Record<string, unknown>) =>
    fetch(`${CONTENT_URL}?resource=${resource}`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data),
    }).then(parse),

  update: (resource: Resource, data: Record<string, unknown>) =>
    fetch(`${CONTENT_URL}?resource=${resource}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(data),
    }).then(parse),

  remove: (resource: Resource, id: number) =>
    fetch(`${CONTENT_URL}?resource=${resource}&id=${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    }).then(parse),
};