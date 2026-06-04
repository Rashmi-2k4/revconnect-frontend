import React, { useState } from 'react'
import Avatar from './Avatar'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { postAPI } from '../api/client'

export default function ComposeBox({ onPost }) {
  const { user } = useAuth()
  const showToast = useToast()
  const [text, setText] = useState('')

  function handlePost() {
    if (!text.trim()) { showToast('Write something first!', 'error'); return }
    const p = { _id:'p'+Date.now(), user, text, likes:[], comments:[], createdAt:new Date() }
    onPost && onPost(p)
    setText('')
    showToast('Posted! ✨', 'success')
    postAPI.create({ text }).catch(() => {})
  }

  return (
    <div style={{ padding:'20px 28px', borderBottom:'1px solid var(--border)' }}>
      <div style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
        <Avatar name={user?.name} accountType={user?.accountType} size={42} />
        <textarea
          style={{ flex:1, background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:12, padding:'14px 16px', color:'var(--text)', fontFamily:"'DM Sans',sans-serif", fontSize:14, resize:'none', outline:'none', minHeight:72, lineHeight:1.6 }}
          placeholder="What's on your mind? Share something..."
          value={text}
          onChange={e => setText(e.target.value)}
          rows={3}
        />
      </div>
      <div style={{ display:'flex', justifyContent:'flex-end', gap:8, marginTop:10, paddingLeft:54 }}>
        <button style={{ background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:8, padding:'7px 12px', color:'var(--muted)', cursor:'pointer', fontSize:12, fontFamily:"'DM Sans',sans-serif" }}>📷 Photo</button>
        <button style={{ background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:8, padding:'7px 12px', color:'var(--muted)', cursor:'pointer', fontSize:12, fontFamily:"'DM Sans',sans-serif" }}>🔗 Link</button>
        <button onClick={handlePost} style={{ background:'linear-gradient(135deg,#6c47ff,#8b6dff)', border:'none', borderRadius:8, padding:'8px 20px', color:'white', fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:12, cursor:'pointer' }}>Publish →</button>
      </div>
    </div>
  )
}
