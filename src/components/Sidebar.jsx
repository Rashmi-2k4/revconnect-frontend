import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Avatar from './Avatar'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'

const NAV = [
  { icon:'⚡', label:'Feed',          path:'/app/feed' },
  { icon:'🔭', label:'Explore',       path:'/app/explore' },
  { icon:'🔔', label:'Notifications', path:'/app/notifications', badge:3 },
  { icon:'🪐', label:'Profile',       path:'/app/profile' },
  { icon:'🤝', label:'Connections',   path:'/app/connections' },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { user, logout } = useAuth()
  const showToast = useToast()

  function handleLogout() {
    logout()
    navigate('/')
    showToast('Logged out', 'success')
  }

  return (
    <aside style={{ position:'sticky', top:0, height:'100vh', padding:'28px 16px', borderRight:'1px solid var(--border)', display:'flex', flexDirection:'column', background:'rgba(13,13,20,0.7)', backdropFilter:'blur(20px)' }}>
      <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:20, letterSpacing:-1, marginBottom:32, paddingLeft:10 }}>
        Rev<span style={{ background:'linear-gradient(135deg,#6c47ff,#ff4778)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Connect</span>
      </div>

      <div style={{ fontSize:9, textTransform:'uppercase', letterSpacing:2, color:'var(--muted)', padding:'0 10px', marginBottom:6 }}>Discover</div>
      {NAV.slice(0,3).map(n => <NavItem key={n.path} item={n} active={pathname===n.path} onClick={() => navigate(n.path)} />)}

      <div style={{ fontSize:9, textTransform:'uppercase', letterSpacing:2, color:'var(--muted)', padding:'0 10px', marginBottom:6, marginTop:20 }}>You</div>
      {NAV.slice(3).map(n => <NavItem key={n.path} item={n} active={pathname===n.path} onClick={() => navigate(n.path)} />)}

      <div onClick={() => navigate('/app/profile')} style={{ marginTop:'auto', display:'flex', alignItems:'center', gap:10, padding:'12px 10px', borderRadius:10, border:'1px solid var(--border)', background:'var(--surface2)', cursor:'pointer' }}>
        <Avatar name={user?.name} accountType={user?.accountType} size={36} />
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:13, fontWeight:600, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{user?.name || 'User'}</div>
          <div style={{ fontSize:10, color:'var(--muted)' }}>● {user?.accountType || 'personal'}</div>
        </div>
        <div onClick={e => { e.stopPropagation(); handleLogout() }} style={{ color:'var(--muted)', cursor:'pointer', padding:4, fontSize:13 }}>✕</div>
      </div>
    </aside>
  )
}

function NavItem({ item, active, onClick }) {
  return (
    <div onClick={onClick} style={{ display:'flex', alignItems:'center', gap:12, padding:'11px 14px', borderRadius:10, cursor:'pointer', color: active ? 'var(--text)' : 'var(--muted)', fontWeight:500, fontSize:14, position:'relative', userSelect:'none', background: active ? 'rgba(108,71,255,0.12)' : 'transparent', marginBottom:2 }}>
      {active && <div style={{ position:'absolute', left:0, top:'50%', transform:'translateY(-50%)', width:3, height:'60%', background:'var(--accent)', borderRadius:'0 2px 2px 0' }} />}
      <span style={{ fontSize:17, width:20, textAlign:'center' }}>{item.icon}</span>
      <span>{item.label}</span>
      {item.badge && <span style={{ marginLeft:'auto', background:'#ff4778', color:'white', fontSize:10, fontWeight:700, padding:'1px 7px', borderRadius:20 }}>{item.badge}</span>}
    </div>
  )
}
