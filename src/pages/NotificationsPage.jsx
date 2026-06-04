import React, { useEffect, useState } from "react"
import { notificationAPI } from "../api/client"
import Avatar from "../components/Avatar"

export default function NotificationsPage() {

  const [notifications, setNotifications] = useState([])

  useEffect(() => {

    notificationAPI.get()
      .then(setNotifications)
      .catch(()=>{})

  }, [])

  return (

    <div style={{ animation:'fadeUp 0.4s ease forwards' }}>

      <div style={{
        position:'sticky',
        top:0,
        zIndex:10,
        background:'rgba(5,5,8,0.85)',
        backdropFilter:'blur(20px)',
        padding:'18px 28px',
        borderBottom:'1px solid var(--border)'
      }}>

        <div style={{
          fontFamily:"'Syne',sans-serif",
          fontWeight:800,
          fontSize:20
        }}>
          Notifications
        </div>

      </div>

      {notifications.length === 0 && (
        <div style={{padding:40,color:'var(--muted)',textAlign:'center'}}>
          No notifications yet 🔔
        </div>
      )}


      {notifications.map(n => (

          <div
            key={n._id}
            style={{
              display:'flex',
              gap:12,
              alignItems:'flex-start',
              padding:'16px 28px',
              borderBottom:'1px solid var(--border)'
            }}
          >

            <Avatar
              name={n?.from?.name || "User"}
              accountType={n?.from?.accountType}
              size={38}
            />

            <div>

              {n.type === "follow" && (
                <div>
                  <strong>{n?.from?.name || "Someone"}</strong> started following you
                </div>
              )}

              {n.type === "like" && (
                <div>
                  <strong>{n?.from?.name || "Someone"}</strong> liked your post
                </div>
              )}

              {n.type === "comment" && (
                <div>
                  <strong>{n?.from?.name || "Someone"}</strong> commented on your post
                </div>
              )}

              <div style={{
                fontSize:11,
                color:'var(--muted)',
                marginTop:3
              }}>
                {n.createdAt ? new Date(n.createdAt).toLocaleString() : ""}
              </div>

            </div>

          </div>

        ))}

    </div>

  )
}