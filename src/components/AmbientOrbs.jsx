import React from 'react'

const base = { position:'fixed', borderRadius:'50%', filter:'blur(80px)', pointerEvents:'none', zIndex:0, animation:'drift 20s ease-in-out infinite alternate' }

export default function AmbientOrbs() {
  return (
    <>
      <div style={{ ...base, width:520, height:520, background:'rgba(108,71,255,0.3)',  top:-150,  right:-80,  animationDelay:'0s'  }} />
      <div style={{ ...base, width:420, height:420, background:'rgba(255,71,120,0.2)',  bottom:-80, left:-100, animationDelay:'-7s' }} />
      <div style={{ ...base, width:300, height:300, background:'rgba(0,229,195,0.09)', top:'40%', left:'45%', animationDelay:'-13s'}} />
    </>
  )
}
