import React, { useState, useEffect } from 'react'
import Avatar from '../components/Avatar'
import AccountBadge from '../components/AccountBadge'
import { socialAPI, profileAPI } from '../api/client'
import { useToast } from '../hooks/useToast'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"

export default function ExplorePage() {
    const showToast = useToast()
    const [query, setQuery] = useState('')
    const [users, setUsers] = useState([])
    const { updateUser } = useAuth()
    const [followed, setFollowed] = useState({})
    const navigate = useNavigate()

    useEffect(() => {

        async function load() {

          const data = await socialAPI.getUsers()
          if (Array.isArray(data)) setUsers(data)

          const me = await profileAPI.getMe()

          const map = {}
          me.following?.forEach(id => {
            map[id] = true
          })

          setFollowed(map)

        }

        load()

      }, [])

    const results = query.trim()
        ? users.filter(u =>
            (u.name || "Unknown User").toLowerCase().includes(query.toLowerCase())
          )
        : users

  async function toggle(id) {

        try {

          if (followed[id]) {
            await socialAPI.unfollow(id)
          } else {
            await socialAPI.follow(id)
          }

          setFollowed(f => ({ ...f, [id]: !f[id] }))

          // refresh logged in user
          const updatedUser = await profileAPI.getMe()
          updateUser(updatedUser)

          showToast(followed[id] ? "Unfollowed" : "Following 🎯", "success")

        } catch (err) {
          console.error(err)
        }

      }

  return (
    <div style={{ animation:'fadeUp 0.4s ease forwards' }}>
      <div style={{ position:'sticky', top:0, zIndex:10, background:'rgba(5,5,8,0.85)', backdropFilter:'blur(20px)', padding:'18px 28px', borderBottom:'1px solid var(--border)' }}>
        <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:20, letterSpacing:-0.5 }}>Explore</div>
      </div>
      <div style={{ padding:'28px 28px' }}>
        <div style={{ position:'relative', marginBottom:24 }}>
          <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'var(--muted)', fontSize:16 }}>🔍</span>
          <input style={{ width:'100%', background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:12, padding:'13px 16px 13px 44px', color:'var(--text)', fontFamily:"'DM Sans',sans-serif", fontSize:14, outline:'none' }} placeholder="Search people, posts, businesses..." value={query} onChange={e => setQuery(e.target.value)} />
        </div>
        <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14, marginBottom:14 }}>{query ? 'Results for "' + query + '"' : 'Suggested Connections'}</div>
        {results.length ? results.map(u => (
          <div key={u._id} onClick={() => navigate(`/app/profile/${u._id}`)} style={{ display:'flex', alignItems:'center', gap:14, padding:'16px 18px', borderRadius:12, border:'1px solid var(--border)', marginBottom:10, background:'var(--surface2)', cursor:'pointer' }}>
            <Avatar name={u.name} accountType={u.accountType} size={50} />
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:600, fontSize:15, marginBottom:3 }}>{u.name}</div>
              <AccountBadge type={u.accountType} />
              <div style={{ fontSize:12, color:'var(--muted)', marginTop:4 }}>{u.bio}</div>
            </div>
            <button onClick={(e) =>{e.stopPropagation(); toggle(u._id)}} style={{ background: followed[u._id] ? 'rgba(108,71,255,0.15)' : 'transparent', border: followed[u._id] ? '1px solid transparent' : '1px solid var(--accent)', borderRadius:9, padding:'8px 18px', color: followed[u._id] ? 'var(--muted)' : 'var(--accent)', fontFamily:"'Syne',sans-serif", fontSize:12, fontWeight:700, cursor:'pointer', whiteSpace:'nowrap' }}>
              {followed[u._id] ? 'Following ✓' : '+ Follow'}
            </button>
          </div>
        )) : <div style={{ color:'var(--muted)', textAlign:'center', padding:40 }}>No results found</div>}
      </div>
    </div>
  )
}
