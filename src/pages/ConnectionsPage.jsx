import React, { useState } from 'react'
import Avatar from '../components/Avatar'
import AccountBadge from '../components/AccountBadge'
import { DEMO_USERS } from '../utils/helpers'
import { useToast } from '../hooks/useToast'

export default function ConnectionsPage() {
  const showToast = useToast()
  const [connected, setConnected] = useState({ u2:true, u3:true, u5:true })

  function toggle(id) {
    setConnected(c => ({ ...c, [id]: !c[id] }))
    showToast(connected[id] ? 'Connection removed' : 'Connected! 🤝', 'success')
  }

  return (
    <div style={{ animation:'fadeUp 0.4s ease forwards' }}>
      <div style={{ position:'sticky', top:0, zIndex:10, background:'rgba(5,5,8,0.85)', backdropFilter:'blur(20px)', padding:'18px 28px', borderBottom:'1px solid var(--border)' }}>
        <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:20, letterSpacing:-0.5 }}>Connections</div>
      </div>
      <div style={{ padding:'28px 28px' }}>
        <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14, marginBottom:16 }}>Your Network ({DEMO_USERS.length} connections)</div>
        {DEMO_USERS.map(u => (
          <div key={u._id} style={{ display:'flex', alignItems:'center', gap:14, padding:'16px 18px', borderRadius:12, border:'1px solid var(--border)', marginBottom:10, background:'var(--surface2)' }}>
            <Avatar name={u.name} accountType={u.accountType} size={50} />
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:600, fontSize:15, marginBottom:3 }}>{u.name}</div>
              <AccountBadge type={u.accountType} />
              <div style={{ fontSize:12, color:'var(--muted)', marginTop:4 }}>{u.bio}</div>
            </div>
            <button onClick={() => toggle(u._id)} style={{ background: connected[u._id] ? 'rgba(108,71,255,0.15)' : 'transparent', border: connected[u._id] ? '1px solid transparent' : '1px solid var(--accent)', borderRadius:9, padding:'8px 18px', color: connected[u._id] ? 'var(--muted)' : 'var(--accent)', fontFamily:"'Syne',sans-serif", fontSize:12, fontWeight:700, cursor:'pointer', whiteSpace:'nowrap' }}>
              {connected[u._id] ? 'Connected ✓' : '+ Connect'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
