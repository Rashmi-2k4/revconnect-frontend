const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const TOKEN_KEY = 'rc_token'

function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

async function req(path, opts = {}) {
  const headers = { 'Content-Type': 'application/json', ...opts.headers }
  const token = getToken()
  
  if (token) headers['Authorization'] = 'Bearer ' + token
  
  const res = await fetch(BASE + path, { ...opts, headers })
  
  let data = {};
  try {
    data = await res.json();
  } catch {}

  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      window.location.href = "/";
    }
    throw new Error(data.message || 'HTTP ' + res.status)
  }
  
  return data
}

export const authAPI = {
  login:    (b) => req('/auth/login',    { method:'POST', body:JSON.stringify(b) }),
  register: (b) => req('/auth/register', { method:'POST', body:JSON.stringify(b) }),
}
export const profileAPI = {
  getMe:   ()  => req('/profile/me'),
  update:  (b) => req('/profile/update', { method:'PUT', body:JSON.stringify(b) }),
  followers: (id) => req('/profile/followers/' + id),
  following: (id) => req('/profile/following/' + id),
}
export const postAPI = {
  getFeed: ()  => req('/posts'),
  create:  (b) => req('/posts', { method:'POST', body:JSON.stringify(b) }),
  delete:  (id)=> req('/posts/' + id, { method:'DELETE' }),
}
export const socialAPI = {
  like:    (id)    => req('/social/like/' + id,    { method:'POST' }),
  comment: (id, b) => req('/social/comment/' + id, { method:'POST', body:JSON.stringify(b) }),
  follow: (id) => req('/social/follow/' + id, { method:'POST' }),
  unfollow: (id) => req('/social/unfollow/' + id, { method:'POST' }),
  share: (id) => req('/social/share/' + id, { method:'POST' }),
  getUsers: () => req('/social/users')
}
export const messageAPI = {

  send: (id, b) =>
    req("/messages/send/" + id, {
      method: "POST",
      body: JSON.stringify(b),
    }),

  get: (id) =>
    req("/messages/" + id)

};
export const notificationAPI = {

  get: () => req("/notifications"),
  markRead: (id) => req("/notifications/" + id + "/read", { method: "PUT" })

}
export const connectionAPI = {
  send: (id) => req("/connections/send/" + id, { method: "POST" }),
  accept: (id) => req("/connections/accept/" + id, { method: "PUT" }),
  reject: (id) => req("/connections/reject/" + id, { method: "PUT" }),
  list: () => req("/connections"),
}

