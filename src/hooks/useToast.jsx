import React, { createContext, useContext, useState, useCallback } from 'react'

const Ctx = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now()
    setToasts(p => [...p, { id, message, type }])
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500)
  }, [])

  return (
    <Ctx.Provider value={showToast}>
      {children}
      <div style={{ position:'fixed', bottom:24, right:24, zIndex:9998, display:'flex', flexDirection:'column', gap:10 }}>
        {toasts.map(t => (
          <div key={t.id} style={{ background:'#13131f', border:'1px solid rgba(255,255,255,0.13)', borderRadius:12, padding:'14px 20px', fontSize:14, boxShadow:'0 8px 32px rgba(0,0,0,0.5)', display:'flex', alignItems:'center', gap:10, minWidth:280, animation:'toastIn 0.4s ease forwards' }}>
            <div style={{ width:8, height:8, borderRadius:'50%', flexShrink:0, background: t.type === 'error' ? '#ff4778' : '#00e5c3' }} />
            {t.message}
          </div>
        ))}
      </div>
    </Ctx.Provider>
  )
}

export function useToast() { return useContext(Ctx) }
