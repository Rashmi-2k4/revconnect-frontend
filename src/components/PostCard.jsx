import React, { useState } from 'react'
import Avatar from './Avatar'
import AccountBadge from './AccountBadge'
import { timeAgo } from '../utils/helpers'
import { socialAPI } from '../api/client'
import { useAuth } from '../hooks/useAuth'
import { postAPI } from '../api/client'

export default function PostCard({ post, onUpdate }) {
  const { user } = useAuth()
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [showShare, setShowShare] = useState(false)
  const [users, setUsers] = useState([])
  const author = post.user || {}
  const uid = user?._id || 'u1'
  const isLiked = Array.isArray(post.likes) && post.likes.includes(uid)

  function handleLike() {
    const likes = Array.isArray(post.likes) ? [...post.likes] : []
    const idx = likes.indexOf(uid)
    if (idx > -1) likes.splice(idx, 1); else likes.push(uid)
    onUpdate && onUpdate({ ...post, likes })
    socialAPI.like(post._id).catch(() => {})
  }

  function handleComment() {
    if (!commentText.trim()) return
    const comments = [...(post.comments || []), { user, text: commentText }]
    onUpdate && onUpdate({ ...post, comments })
    setCommentText('')
    socialAPI.comment(post._id, { text: commentText }).catch(() => {})
  }

  async function handleDelete() {
  try {

    await postAPI.delete(post._id)

    window.location.reload()

  } catch (err) {
    console.error(err)
  }
}

  async function handleShare() {
  try {
    await socialAPI.share(post._id)

    window.location.reload()

  } catch (err) {
    console.error(err)
  }
}

 async function openShare() {

  setShowShare(true)

  const data = await socialAPI.getUsers()

  setUsers(data)

}

  const s = {
    card:    { padding:'22px 28px', borderBottom:'1px solid var(--border)', transition:'background 0.2s' },
    hdr:     { display:'flex', alignItems:'center', gap:12, marginBottom:12 },
    name:    { fontWeight:600, fontSize:14 },
    meta:    { display:'flex', gap:7, alignItems:'center', marginTop:2 },
    time:    { fontSize:12, color:'var(--muted)' },
    more:    { marginLeft:'auto', color:'var(--muted)', fontSize:18, cursor:'pointer' },
    text:    { fontSize:15, lineHeight:1.65, color:'rgba(240,239,248,0.88)', marginBottom:14 },
    acts:    { display:'flex', gap:2 },
    btn:     { display:'flex', alignItems:'center', gap:6, padding:'7px 12px', borderRadius:8, border:'none', background:'transparent', color:'var(--muted)', fontSize:13, cursor:'pointer', fontFamily:"'DM Sans',sans-serif" },
    liked:   { color:'#ff4778' },
    comSec:  { marginTop:14, paddingTop:14, borderTop:'1px solid var(--border)' },
    comItem: { display:'flex', gap:9, marginBottom:10, alignItems:'flex-start' },
    bubble:  { background:'var(--surface2)', borderRadius:9, padding:'9px 13px', flex:1, border:'1px solid var(--border)' },
    cname:   { fontSize:12, fontWeight:600, marginBottom:3 },
    ctxt:    { fontSize:13, color:'rgba(240,239,248,0.8)' },
    inputRow:{ display:'flex', gap:8, marginTop:10 },
    cinput:  { flex:1, background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:8, padding:'9px 13px', color:'var(--text)', fontFamily:"'DM Sans',sans-serif", fontSize:13, outline:'none' },
    csend:   { background:'var(--accent)', border:'none', borderRadius:8, padding:'9px 14px', color:'white', cursor:'pointer', fontSize:13 },
  }

  return (
    <div style={s.card}>
      <div style={s.hdr}>
        <Avatar name={author.name} accountType={author.accountType} size={42} />
        <div style={{ flex:1 }}>
          <div style={s.name}>{author.name || 'Unknown'}</div>
          <div style={s.meta}>
            <span style={s.time}>{timeAgo(post.createdAt)}</span>
            <AccountBadge type={author.accountType || 'personal'} />
          </div>
        </div>
        <span style={s.more} onClick={handleDelete}>🗑</span>
      </div>
      <p style={s.text}>{post.text}</p>
      <div style={{ ...s.acts, position: "relative" }}>
        <button style={{ ...s.btn, ...(isLiked ? s.liked : {}) }} onClick={handleLike}>
          {isLiked ? '❤️' : '🤍'} {(post.likes || []).length}
        </button>
        <button style={s.btn} onClick={() => setShowComments(v => !v)}>
          💬 {(post.comments || []).length}
        </button>
        <button style={s.btn} onClick={openShare}>
          🔁 Share
        </button>
      {showShare && (
          <div
            style={{
              position: "absolute",
              right: 0,
              bottom: 40,
              background: "var(--surface2)",
              border: "1px solid var(--border)",
              padding: 15,
              borderRadius: 12,
              width: 220,
              boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 10,
                fontWeight: 600
              }}
            >
              <span>Share with</span>

              <span
                style={{ cursor: "pointer" }}
                onClick={() => setShowShare(false)}
              >
                ✕
              </span>
            </div>

            {users.map((u) => (
              <div
                key={u._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 8
                }}
              >
                <span style={{ fontSize: 14 }}>{u.name}</span>

                <button
                  style={{
                    background: "var(--accent)",
                    border: "none",
                    borderRadius: 8,
                    padding: "5px 12px",
                    color: "white",
                    fontSize: 12,
                    cursor: "pointer"
                  }}
                >
                  Send
                </button>
              </div>
            ))}
          </div>
        )}
      {showComments && (
        <div style={s.comSec}>
          {(post.comments || []).map((c, i) => (
            <div key={i} style={s.comItem}>
              <Avatar name={c.user?.name} accountType={c.user?.accountType} size={30} />
              <div style={s.bubble}>
                <div style={s.cname}>{c.user?.name || 'User'}</div>
                <div style={s.ctxt}>{c.text}</div>
              </div>
            </div>
          ))}
          <div style={s.inputRow}>
            <input style={s.cinput} placeholder="Add a comment..." value={commentText} onChange={e => setCommentText(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleComment()} />
            <button style={s.csend} onClick={handleComment}>→</button>
          </div>
        </div>
            )}
      </div>  
    </div>     
  )
}
