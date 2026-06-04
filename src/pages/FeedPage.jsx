import React, { useState, useEffect } from 'react'
import ComposeBox from '../components/ComposeBox'
import PostCard from '../components/PostCard'
import { postAPI } from '../api/client'
import { DEMO_POSTS } from '../utils/helpers'

const FILTERS = ['All','Creators','Business']

export default function FeedPage() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    postAPI.getFeed()
      .then(data => { if (Array.isArray(data)) setPosts(data) })
  }, [])

  function handleNewPost(p) { setPosts(prev => [p, ...prev]) }
  function handleUpdate(updated) { setPosts(prev => prev.map(p => p._id === updated._id ? updated : p)) }

  const visible = filter === 'All' ? posts : posts.filter(p => {
    if (filter === 'Creators') return p.user?.accountType === 'creator'
    if (filter === 'Business') return p.user?.accountType === 'business'
    return true
  })

  return (
    <div style={{ animation:'fadeUp 0.4s ease forwards' }}>
      <div style={{ position:'sticky', top:0, zIndex:10, background:'rgba(5,5,8,0.85)', backdropFilter:'blur(20px)', padding:'18px 28px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:20, letterSpacing:-0.5 }}>Your Feed</div>
        <div style={{ display:'flex', gap:6 }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding:'5px 14px', borderRadius:20, border: filter===f ? '1px solid var(--accent)' : '1px solid var(--border)', background: filter===f ? 'rgba(108,71,255,0.08)' : 'transparent', color: filter===f ? 'var(--accent)' : 'var(--muted)', fontSize:12, fontWeight:500, cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>{f}</button>
          ))}
        </div>
      </div>
      <ComposeBox onPost={handleNewPost} />
      {visible.map(p => <PostCard key={p._id} post={p} onUpdate={handleUpdate} />)}
    </div>
  )
}
