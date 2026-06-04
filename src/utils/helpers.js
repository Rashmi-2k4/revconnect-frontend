export function timeAgo(date) {
  if (!date) return 'just now'
  const d = typeof date === 'string' ? new Date(date) : date
  const s = (Date.now() - d.getTime()) / 1000
  if (s < 60) return 'just now'
  if (s < 3600) return Math.floor(s / 60) + 'm ago'
  if (s < 86400) return Math.floor(s / 3600) + 'h ago'
  return Math.floor(s / 86400) + 'd ago'
}
export function getInitial(name) { return (name || 'U')[0].toUpperCase() }
export function getAvatarGradient(type) {
  if (type === 'business') return 'linear-gradient(135deg,#f5c842,#e09c00)'
  if (type === 'creator')  return 'linear-gradient(135deg,#00e5c3,#00a88c)'
  return 'linear-gradient(135deg,#6c47ff,#ff4778)'
}
export function getBadgeStyle(type) {
  if (type === 'business') return { background:'rgba(245,200,66,0.15)', color:'#f5c842' }
  if (type === 'creator')  return { background:'rgba(0,229,195,0.12)',  color:'#00e5c3' }
  return { background:'rgba(108,71,255,0.12)', color:'#a08bff' }
}
export const DEMO_POSTS = [
  { _id:'p1', user:{ _id:'u2', name:'Aria Chen',     accountType:'creator'  }, text:'Just dropped my new design system — open source, fully accessible, and brutally beautiful. Link in comments 👇', likes:['u3','u4','u5'], comments:[{ user:{ name:'Marcus V.' }, text:'This is incredible work!' }], createdAt: new Date(Date.now()-3600000) },
  { _id:'p2', user:{ _id:'u3', name:'Nexus Labs',    accountType:'business' }, text:"We're hiring! Senior engineers, product designers, and growth leads. Remote-first, equity-heavy. DM us.", likes:['u2'], comments:[], createdAt: new Date(Date.now()-7200000) },
  { _id:'p3', user:{ _id:'u4', name:'Jordan Rivers',  accountType:'personal' }, text:"Three months into building my startup and the most valuable skill isn't coding — it's showing up consistently.", likes:['u2','u3'], comments:[{ user:{ name:'Aria Chen' }, text:'This hit different. Needed this today.' }], createdAt: new Date(Date.now()-86400000) },
  { _id:'p4', user:{ _id:'u5', name:'Maya Okonkwo',  accountType:'creator'  }, text:"Hot take: The creator economy needs creators who actually have something to say. Less noise, more signal.", likes:['u2','u3','u4'], comments:[], createdAt: new Date(Date.now()-172800000) },
]
export const DEMO_USERS = [
  { _id:'u2', name:'Aria Chen',    accountType:'creator',  bio:'Design systems & open source' },
  { _id:'u3', name:'Nexus Labs',   accountType:'business', bio:'Building next-gen developer tools' },
  { _id:'u5', name:'Maya Okonkwo', accountType:'creator',  bio:'Words, ideas, and the space between' },
]
export const DEMO_NOTIFS = [
  { id:'n1', actor:'Aria Chen',         text:'liked your post',            time:'2m ago',  unread:true,  icon:'❤️', bg:'rgba(255,71,120,0.1)' },
  { id:'n2', actor:'Nexus Labs',        text:'started following you',      time:'1h ago',  unread:true,  icon:'👤', bg:'rgba(108,71,255,0.1)' },
  { id:'n3', actor:'Jordan Rivers',     text:'commented: "This is gold!"', time:'3h ago',  unread:true,  icon:'💬', bg:'rgba(0,229,195,0.1)'  },
  { id:'n4', actor:'Maya Okonkwo',      text:'liked your comment',         time:'1d ago',  unread:false, icon:'❤️', bg:'rgba(255,71,120,0.1)' },
  { id:'n5', actor:'Tech Ventures Co.', text:'started following you',      time:'2d ago',  unread:false, icon:'👤', bg:'rgba(108,71,255,0.1)' },
]
