import React, { useState, useEffect } from 'react'
import Avatar from '../components/Avatar'
import AccountBadge from '../components/AccountBadge'
import PostCard from '../components/PostCard'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { profileAPI } from '../api/client'
import { useNavigate } from "react-router-dom";
import { postAPI } from "../api/client"
import { useParams } from "react-router-dom"
import { socialAPI } from "../api/client"

export default function ProfilePage() {
  const { user, updateUser } = useAuth()
  const { id } = useParams()
  const [profileUser, setProfileUser] = useState(null)
  const [posts, setPosts] = useState([])
  const displayUser = profileUser || user
  const [showList, setShowList] = useState(false)
  const navigate = useNavigate();
  const [listTitle, setListTitle] = useState("")
  const [listUsers, setListUsers] = useState([])
  const showToast = useToast()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ name: (profileUser || user)?.name||'', bio: user?.bio||'', location: user?.location||'', website: user?.website||'' })
  const handle = '@' + ((profileUser || user)?.name||'user').toLowerCase().replace(/\s+/g,'')

  useEffect(() => {
      if (id) {
        socialAPI.getUsers().then(users => {
          const found = users.find(u => u._id === id)
          if (found) setProfileUser(found)
        })
      }
    }, [id])

  useEffect(() => {
        postAPI.getFeed()
          .then(data => {
            if (Array.isArray(data)) {
              const myPosts = data.filter(
                p => (p.user?._id || p.user) === displayUser?._id
              )
              setPosts(myPosts)
            }
          })
          .catch(() => {})
      }, [displayUser])

      async function openFollowers() {

        const data = await profileAPI.followers(displayUser._id)

        setListUsers(data)
        setListTitle("Followers")
        setShowList(true)

      }

      async function openFollowing() {

        const data = await profileAPI.following(displayUser._id)

        setListUsers(data)
        setListTitle("Following")
        setShowList(true)

      }

  function saveProfile() {
    updateUser(form); setEditing(false)
    showToast('Profile updated! ✅', 'success')
    profileAPI.update(form).catch(() => {})
  }

  const inp = { background:'var(--bg)', border:'1px solid var(--border)', borderRadius:9, padding:'11px 14px', color:'var(--text)', fontFamily:"'DM Sans',sans-serif", fontSize:13, outline:'none', width:'100%' }
  const lbl = { fontSize:11, fontWeight:500, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'1px', display:'block', marginBottom:6 }

  return (
    <div style={{ animation:'fadeUp 0.4s ease forwards' }}>
      <div style={{ height:190, background:'linear-gradient(135deg,rgba(108,71,255,0.4),rgba(255,71,120,0.3),rgba(0,229,195,0.2))', borderBottom:'1px solid var(--border)' }} />
      <div style={{ padding:'0 28px 28px' }}>
        <div style={{ marginTop:-42, marginBottom:14, display:'inline-block', border:'3px solid var(--bg)', borderRadius:'50%' }}>
          <Avatar name={displayUser?.name} accountType={displayUser?.accountType}  size={84} />
           </div>
             <div style={{ display:'flex', gap:10 }}>

            <button
              onClick={() => navigate(`/app/messages/${displayUser._id}`)}
              style={{
                background:'transparent',
                border:'1px solid var(--accent)',
                borderRadius:9,
                padding:'9px 18px',
                color:'var(--accent)',
                fontFamily:"'Syne',sans-serif",
                fontWeight:700,
                fontSize:12,
                cursor:'pointer'
              }}
            >
              💬 Message
            </button>

            <button
              onClick={() => setEditing(v => !v)}
              style={{
                background:'linear-gradient(135deg,#6c47ff,#8b6dff)',
                border:'none',
                borderRadius:9,
                padding:'9px 18px',
                color:'white',
                fontFamily:"'Syne',sans-serif",
                fontWeight:700,
                fontSize:12,
                cursor:'pointer'
              }}
            >
              {editing ? '✕ Cancel' : '✏️ Edit Profile'}
            </button>

          </div>

        <p style={{ fontSize:14, lineHeight:1.6, color:'rgba(240,239,248,0.8)', margin:'10px 0', maxWidth:480 }}>{displayUser?.bio || '✨ Add a bio to tell people about yourself.'}</p>
        <div style={{ display:'flex', gap:16, flexWrap:'wrap', marginBottom:16 }}>
          {user?.location && <span style={{ fontSize:12, color:'var(--muted)' }}>📍 {user.location}</span>}
          {user?.website  && <span style={{ fontSize:12, color:'var(--muted)' }}>🔗 <a href={user.website} style={{ color:'var(--accent)' }}>{user.website}</a></span>}
        </div>

        <div
          style={{
            display: 'flex',
            gap: 24,
            padding: '16px',
            background: 'var(--surface2)',
            borderRadius: 12,
            border: '1px solid var(--border)',
            marginBottom: 20
          }}
        >

          {/* Posts */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:800 }}>
              {posts.length}
            </div>
            <div style={{ fontSize:10, color:'var(--muted)', textTransform:'uppercase' }}>
              Posts
            </div>
          </div>

          {/* Followers */}
          <div
            onClick={openFollowers}
            style={{ textAlign:'center', cursor:"pointer" }}
          >
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:800 }}>
              {(displayUser?.followers || []).length}
            </div>
            <div style={{ fontSize:10, color:'var(--muted)', textTransform:'uppercase' }}>
              Followers
            </div>
          </div>

          {/* Following */}
          <div
            onClick={openFollowing}
            style={{ textAlign:'center', cursor:"pointer" }}
          >
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:800 }}>
              {(displayUser?.following || []).length}
            </div>
            <div style={{ fontSize:10, color:'var(--muted)', textTransform:'uppercase' }}>
              Following
            </div>
          </div>

          {/* Connections */}
          <div style={{ textAlign:'center' }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:800 }}>
              3
            </div>
            <div style={{ fontSize:10, color:'var(--muted)', textTransform:'uppercase' }}>
              Connections
            </div>
          </div>

        </div>

        {showList && (

          <div style={{
            position:"fixed",
            top:"50%",
            left:"50%",
            transform:"translate(-50%,-50%)",
            background:"var(--surface2)",
            border:"1px solid var(--border)",
            borderRadius:12,
            padding:20,
            width:300,
            zIndex:100
          }}>

            <div style={{
              display:"flex",
              justifyContent:"space-between",
              marginBottom:15
            }}>
              <b>{listTitle}</b>

              <span
                style={{cursor:"pointer"}}
                onClick={()=>setShowList(false)}
              >
                ✕
              </span>
            </div>

            {listUsers.map(u => (

              <div
                key={u._id}
                style={{
                  display:"flex",
                  alignItems:"center",
                  gap:10,
                  marginBottom:10
                }}
              >

                <Avatar name={u.name} accountType={u.accountType} size={35}/>

                <span>{u.name}</span>

              </div>

            ))}

          </div>

        )}

        {editing && (
          <div style={{ background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:14, padding:20, marginBottom:20 }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:15, marginBottom:16 }}>Edit Profile</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:12 }}>
              <div><label style={lbl}>Name</label><input style={inp} value={form.name}     onChange={e => setForm(f => ({...f, name:     e.target.value}))} /></div>
              <div><label style={lbl}>Location</label><input style={inp} value={form.location} onChange={e => setForm(f => ({...f, location: e.target.value}))} /></div>
              <div><label style={lbl}>Website</label><input style={inp} value={form.website}  onChange={e => setForm(f => ({...f, website:  e.target.value}))} /></div>
            </div>
            <div style={{ marginBottom:14 }}><label style={lbl}>Bio</label><textarea style={{ ...inp, resize:'none', minHeight:72 }} value={form.bio} onChange={e => setForm(f => ({...f, bio: e.target.value}))} /></div>
            <div style={{ display:'flex', justifyContent:'flex-end' }}>
              <button onClick={saveProfile} style={{ background:'linear-gradient(135deg,#6c47ff,#8b6dff)', border:'none', borderRadius:8, padding:'10px 22px', color:'white', fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:13, cursor:'pointer' }}>Save Changes</button>
            </div>
          </div>
        )}

        <div style={{ borderTop:'1px solid var(--border)', paddingTop:20 }}>
          <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, marginBottom:14 }}>Your Posts</div>
          {posts.length ? posts.map(p =>  <PostCard key={p._id} post={p} />) : <div style={{ color:'var(--muted)', textAlign:'center', padding:40 }}>No posts yet. Share something! ✨</div>}
        </div>
      </div>
    </div>
  )
}
