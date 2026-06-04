import React, { useEffect, useState } from "react"
import { messageAPI, socialAPI } from "../api/client"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import Avatar from "../components/Avatar"

export default function MessagesPage() {

  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [messages, setMessages] = useState([])
  const [text, setText] = useState("")
  const [receiver, setReceiver] = useState(null)
  const [users, setUsers] = useState([])

  useEffect(() => {

    socialAPI.getUsers().then(setUsers)

  }, [])

  useEffect(() => {
    socialAPI.getUsers().then(data => {
      setUsers(data)

      if (id) {
        const found = data.find(u => u._id === id)
        setReceiver(found)
      }
    })
  }, [id])


  async function send() {

    if(!text.trim()) return

    const msg = await messageAPI.send(id,{ text })

    setMessages(prev => [...prev, msg])
    setText("")

  }


  return (

    <div style={{
      display:"flex",
      height:"85vh"
    }}>


      {/* LEFT CONVERSATIONS */}

      <div style={{
        width:280,
        borderRight:"1px solid var(--border)",
        overflowY:"auto"
      }}>

        <div style={{
          padding:"16px",
          fontWeight:700,
          borderBottom:"1px solid var(--border)"
        }}>
          Messages
        </div>

        {users.map(u => (

          <div
            key={u._id}
            onClick={()=>navigate(`/app/messages/${u._id}`)}
            style={{
              display:"flex",
              alignItems:"center",
              gap:10,
              padding:"12px 16px",
              cursor:"pointer",
              background:id===u._id ? "var(--surface2)" : "transparent"
            }}
          >

            <Avatar name={u.name} accountType={u.accountType} size={38}/>

            <div style={{fontSize:14}}>
              {u.name}
            </div>

          </div>

        ))}

      </div>


      {/* CHAT SECTION */}

      <div style={{
        flex:1,
        display:"flex",
        flexDirection:"column"
      }}>


        {/* HEADER */}

        <div style={{
          display:"flex",
          alignItems:"center",
          gap:10,
          padding:"14px 20px",
          borderBottom:"1px solid var(--border)"
        }}>

          {receiver && (
            <>
              <Avatar name={receiver.name} accountType={receiver.accountType} size={38}/>
              <div style={{fontWeight:600}}>
                {receiver.name}
              </div>
            </>
          )}

        </div>


        {/* MESSAGES */}

        <div style={{
          flex:1,
          overflowY:"auto",
          padding:"25px 30px"
        }}>

          {messages.map(m => (

            <div
              key={m._id}
              style={{
                display:"flex",
                justifyContent:
                  m.sender?._id === user?._id
                    ? "flex-end"
                    : "flex-start",
                marginBottom:12
              }}
            >

              <div style={{
                background:
                  m.sender?._id === user?._id
                    ? "linear-gradient(135deg,#6c47ff,#8b6dff)"
                    : "var(--surface2)",
                padding:"10px 14px",
                borderRadius:14,
                maxWidth:280,
                fontSize:14
              }}>

                {m.text}

              </div>

            </div>

          ))}

        </div>


        {/* INPUT */}

        <div style={{
          display:"flex",
          alignItems:"center",
          gap:10,
          padding:"14px 20px",
          borderTop:"1px solid var(--border)"
        }}>

          <span style={{fontSize:20,cursor:"pointer"}}>📷</span>
          <span style={{fontSize:20,cursor:"pointer"}}>📎</span>

          <input
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Type a message..."
            style={{
              flex:1,
              padding:"12px 16px",
              borderRadius:20,
              border:"1px solid var(--border)",
              background:"var(--surface2)",
              color:"white",
              outline:"none"
            }}
          />

          <span style={{fontSize:20,cursor:"pointer"}}>🎤</span>

          <button
            onClick={send}
            style={{
              padding:"10px 18px",
              borderRadius:20,
              border:"none",
              background:"linear-gradient(135deg,#6c47ff,#8b6dff)",
              color:"white",
              cursor:"pointer"
            }}
          >
            Send
          </button>

        </div>

      </div>

    </div>

  )
}