import React, { useState } from 'react'
import Avatar from './Avatar'
import { useNavigate } from "react-router-dom"
import { socialAPI } from "../api/client"
import { useEffect } from "react"
import AccountBadge from './AccountBadge'
import { DEMO_USERS } from '../utils/helpers'

const TRENDING = [
  { tag:'#CreatorEconomy', count:'12.4K posts' },
  { tag:'#StartupLife',    count:'8.7K posts'  },
  { tag:'#BuildInPublic',  count:'6.2K posts'  },
  { tag:'#Networking2025', count:'4.1K posts'  },
]

export default function RightPanel() {
  const [followed, setFollowed] = useState({})
  const navigate = useNavigate()
  const [chatUsers, setChatUsers] = useState([])

  useEffect(() => {
  socialAPI.getUsers()
    .then(data => {
      if (Array.isArray(data)) setChatUsers(data.slice(0,5))
    })
    .catch(()=>{})
}, [])

  return (

    
    <aside style={{ padding:'24px 20px', position:'sticky', top:0, height:'100vh', overflowY:'auto' }}>
      <div style={{ position:'relative', marginBottom:24 }}>
        <span style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'var(--muted)', fontSize:14 }}>🔍</span>
        <input style={{ width:'100%', background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:10, padding:'11px 14px 11px 36px', color:'var(--text)', fontFamily:"'DM Sans',sans-serif", fontSize:13, outline:'none' }} placeholder="Search RevConnect..." />
      </div>

      <div style={{ marginBottom:28 }}>
        <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14, marginBottom:12 }}>✨ Suggestions</div>
        <div style={{ marginBottom:28 }}>
          <div style={{
            fontFamily:"'Syne',sans-serif",
            fontWeight:700,
            fontSize:14,
            marginBottom:12
          }}>
            💬 Messages
          </div>

          {chatUsers.map(u => (

            <div
              key={u._id}
              onClick={() => navigate(`/app/messages/${u._id}`)}
              style={{
                display:'flex',
                alignItems:'center',
                gap:10,
                padding:'10px 12px',
                borderRadius:8,
                border:'1px solid var(--border)',
                marginBottom:6,
                background:'var(--surface2)',
                cursor:'pointer'
              }}
            >

              <div style={{ position:"relative" }}>
                  <Avatar name={u.name} accountType={u.accountType} size={36} />

                  <span style={{
                    position:"absolute",
                    bottom:1,
                    right:1,
                    width:8,
                    height:8,
                    borderRadius:"50%",
                    background:"#22c55e",
                    border:"2px solid var(--surface2)"
                  }} />
                </div>

              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:600 }}>
                  {u.name}
                </div>

                <div style={{
                  fontSize:11,
                  color:'var(--muted)'
                }}>
                  Tap to message
                </div>
              </div>

            </div>

          ))}

        </div>



      <div style={{ marginBottom:28 }}>
        <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14, marginBottom:12 }}>🔥 Trending</div>
        {TRENDING.map(t => (
          <div key={t.tag} style={{ padding:'10px 12px', borderRadius:8, border:'1px solid var(--border)', marginBottom:6, background:'var(--surface2)', cursor:'pointer' }}>
            <div style={{ fontSize:12, fontWeight:600, color:'var(--accent)' }}>{t.tag}</div>
            <div style={{ fontSize:11, color:'var(--muted)' }}>{t.count}</div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom:28 }}>
        <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14, marginBottom:12 }}>✨ Suggestions</div>

        </div>
        {DEMO_USERS.map(u => (
          <div key={u._id} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 12px', borderRadius:8, border:'1px solid var(--border)', marginBottom:6, background:'var(--surface2)' }}>
            <Avatar name={u.name} accountType={u.accountType} size={36} />
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:13, fontWeight:600, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{u.name}</div>
              <AccountBadge type={u.accountType} />
            </div>
            <button onClick={() => setFollowed(f => ({ ...f, [u._id]: !f[u._id] }))} style={{ background: followed[u._id] ? 'rgba(108,71,255,0.15)' : 'transparent', border: followed[u._id] ? '1px solid transparent' : '1px solid var(--accent)', borderRadius:7, padding:'5px 12px', color: followed[u._id] ? 'var(--muted)' : 'var(--accent)', fontFamily:"'Syne',sans-serif", fontSize:11, fontWeight:700, cursor:'pointer', whiteSpace:'nowrap' }}>
              {followed[u._id] ? 'Following ✓' : 'Follow'}
            </button>
          </div>
        ))}
      </div>

      <div style={{ fontSize:11, color:'var(--muted)', lineHeight:1.8 }}>
        © 2025 RevConnect · <span style={{ color:'var(--accent)', cursor:'pointer' }}>Privacy</span> · <span style={{ color:'var(--accent)', cursor:'pointer' }}>Terms</span>
      </div>
    </aside>
  )
}
