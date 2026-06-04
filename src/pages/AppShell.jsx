import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AmbientOrbs from '../components/AmbientOrbs'
import Sidebar from '../components/Sidebar'
import RightPanel from '../components/RightPanel'
import FeedPage from './FeedPage'
import ProfilePage from './ProfilePage'
import NotificationsPage from './NotificationsPage'
import ExplorePage from './ExplorePage'
import ConnectionsPage from './ConnectionsPage'
import MessagesPage from "./MessagesPage";

export default function AppShell() {
  return (
    <div style={{ position:'relative', zIndex:1 }}>
      <AmbientOrbs />
      <div style={{ display:'grid', gridTemplateColumns:'260px 1fr 300px', minHeight:'100vh', maxWidth:1400, margin:'0 auto', position:'relative', zIndex:1 }}>
        <Sidebar />
        <main style={{ borderRight:'1px solid var(--border)', minHeight:'100vh', overflowY:'auto' }}>
          <Routes>
            <Route path="feed"          element={<FeedPage />} />
            <Route path="profile"       element={<ProfilePage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="explore"       element={<ExplorePage />} />
            <Route path="connections"   element={<ConnectionsPage />} />
            <Route path="*"             element={<Navigate to="feed" replace />} />
            <Route path="messages/:id"  element={<MessagesPage />} />
            <Route path="profile/:id"   element={<ProfilePage />} />
          </Routes>
        </main>
        <RightPanel />
      </div>
    </div>
  )
}
