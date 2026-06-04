import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AmbientOrbs from '../components/AmbientOrbs'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { authAPI } from '../api/client'

export default function LandingPage() {
  const navigate = useNavigate()
  const { saveSession } = useAuth()
  const showToast = useToast()
  const [tab, setTab] = useState('login')
  const [accountType, setAccountType] = useState('personal')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPass,  setLoginPass]  = useState('')
  const [regName,    setRegName]    = useState('')
  const [regEmail,   setRegEmail]   = useState('')
  const [regPass,    setRegPass]    = useState('')

  function mockLogin(name, isNew) {
    const user = { _id:'u1', name, email: name, accountType, followers:[], following:[], connections:[], bio:'', location:'', website:'' }
    saveSession({ token:'demo-token', user })
    navigate('/app/feed')
    showToast(isNew ? 'Welcome to RevConnect! 🎉' : 'Signed in (demo mode)', 'success')
  }

  async function handleLogin() {
    if (!loginEmail || !loginPass) { showToast('Please fill in all fields', 'error'); return }
    try {
      const data = await authAPI.login({ email: loginEmail, password: loginPass })
      saveSession(data); navigate('/app/feed')
    } catch { mockLogin(loginEmail.split('@')[0]) }
  }

  async function handleRegister() {
    if (!regName || !regEmail || !regPass) { showToast('Please fill in all fields', 'error'); return }
    try {
      const data = await authAPI.register({ name: regName, email: regEmail, password: regPass, accountType })
      saveSession(data); navigate('/app/feed')
      showToast('Welcome to RevConnect! 🎉', 'success')
    } catch { mockLogin(regName, true) }
  }

  const inputStyle = { background:'var(--bg)', border:'1px solid var(--border)', borderRadius:9, padding:'12px 15px', color:'var(--text)', fontFamily:"'DM Sans',sans-serif", fontSize:14, outline:'none', width:'100%', marginTop:6 }
  const labelStyle = { fontSize:11, fontWeight:500, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'1px', display:'block', marginBottom:2 }

  return (
    <div style={{ position:'relative', zIndex:1 }}>
      <AmbientOrbs />
      <div style={{ minHeight:'100vh', display:'grid', gridTemplateColumns:'1fr 1fr', position:'relative', zIndex:1 }}>

        <div style={{ padding:'50px 60px', display:'flex', flexDirection:'column', justifyContent:'center' }}>
          <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:26, letterSpacing:-1, marginBottom:60 }}>
            Rev<span style={{ background:'linear-gradient(135deg,#6c47ff,#ff4778)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Connect</span>
          </div>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:60, fontWeight:800, lineHeight:1.0, letterSpacing:-2, marginBottom:20 }}>
            Build your<br />
            <span style={{ background:'linear-gradient(90deg,#6c47ff,#ff4778,#00e5c3)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>network.</span><br />
            Ignite your<br />
            <span style={{ background:'linear-gradient(90deg,#6c47ff,#ff4778,#00e5c3)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>brand.</span>
          </h1>
          <p style={{ fontSize:16, color:'var(--muted)', lineHeight:1.6, maxWidth:380, marginBottom:40, fontWeight:300 }}>
            The platform where creators, businesses, and professionals converge to connect and grow.
          </p>
          <div style={{ display:'flex', gap:36 }}>
            {[['2.4M+','Members'],['98K','Businesses'],['340K','Creators']].map(([n,l]) => (
              <div key={l}>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:28, fontWeight:800, background:'linear-gradient(135deg,var(--text),var(--muted))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{n}</div>
                <div style={{ fontSize:11, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'1.5px' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background:'var(--surface)', borderLeft:'1px solid var(--border)', padding:'50px', display:'flex', flexDirection:'column', justifyContent:'center' }}>
          <div style={{ display:'flex', background:'var(--bg)', borderRadius:10, padding:4, marginBottom:32, border:'1px solid var(--border)' }}>
            {['login','register'].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{ flex:1, padding:9, border:'none', background: tab===t ? 'linear-gradient(135deg,#6c47ff,#8b6dff)' : 'transparent', color: tab===t ? 'white' : 'var(--muted)', fontFamily:"'Syne',sans-serif", fontWeight:600, fontSize:13, cursor:'pointer', borderRadius:7, boxShadow: tab===t ? '0 3px 16px rgba(108,71,255,0.35)' : 'none' }}>
                {t === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          {tab === 'login' ? (
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              <div><label style={labelStyle}>Email Address</label><input style={inputStyle} type="email" placeholder="you@example.com" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} /></div>
              <div><label style={labelStyle}>Password</label><input style={inputStyle} type="password" placeholder="••••••••••" value={loginPass} onChange={e => setLoginPass(e.target.value)} /></div>
              <button onClick={handleLogin} style={{ background:'linear-gradient(135deg,#6c47ff,#8b6dff)', border:'none', borderRadius:10, padding:14, color:'white', fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14, cursor:'pointer', boxShadow:'0 6px 24px rgba(108,71,255,0.35)', marginTop:4 }}>Sign In to RevConnect</button>
              <p style={{ textAlign:'center', fontSize:12, color:'var(--muted)' }}>No account? <span style={{ color:'var(--accent)', cursor:'pointer' }} onClick={() => setTab('register')}>Create one →</span></p>
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              <div><label style={labelStyle}>Full Name</label><input style={inputStyle} placeholder="Your full name" value={regName} onChange={e => setRegName(e.target.value)} /></div>
              <div><label style={labelStyle}>Email Address</label><input style={inputStyle} type="email" placeholder="you@example.com" value={regEmail} onChange={e => setRegEmail(e.target.value)} /></div>
              <div><label style={labelStyle}>Password</label><input style={inputStyle} type="password" placeholder="Create a strong password" value={regPass} onChange={e => setRegPass(e.target.value)} /></div>
              <div>
                <label style={labelStyle}>Account Type</label>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8, marginTop:6 }}>
                  {[['personal','👤','Personal'],['creator','✨','Creator'],['business','🏢','Business']].map(([t,icon,lbl]) => (
                    <div key={t} onClick={() => setAccountType(t)} style={{ padding:'12px 8px', border: accountType===t ? '1px solid var(--accent)' : '1px solid var(--border)', borderRadius:9, cursor:'pointer', textAlign:'center', background: accountType===t ? 'rgba(108,71,255,0.08)' : 'var(--bg)', boxShadow: accountType===t ? '0 0 0 1px var(--accent)' : 'none' }}>
                      <div style={{ fontSize:20, marginBottom:5 }}>{icon}</div>
                      <div style={{ fontSize:10, fontWeight:600, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.5px' }}>{lbl}</div>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={handleRegister} style={{ background:'linear-gradient(135deg,#6c47ff,#8b6dff)', border:'none', borderRadius:10, padding:14, color:'white', fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14, cursor:'pointer', boxShadow:'0 6px 24px rgba(108,71,255,0.35)', marginTop:4 }}>Create My Account →</button>
              <p style={{ textAlign:'center', fontSize:12, color:'var(--muted)' }}>Already a member? <span style={{ color:'var(--accent)', cursor:'pointer' }} onClick={() => setTab('login')}>Sign in →</span></p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
