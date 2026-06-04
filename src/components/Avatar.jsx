import React from 'react'
import { getInitial, getAvatarGradient } from '../utils/helpers'

export default function Avatar({ name, accountType, size = 44 }) {
  return (
    <div style={{ width:size, height:size, borderRadius:'50%', background:getAvatarGradient(accountType), display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:size*0.38, color:'#fff', flexShrink:0 }}>
      {getInitial(name)}
    </div>
  )
}
