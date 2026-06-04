import React from 'react'
import { getBadgeStyle } from '../utils/helpers'

export default function AccountBadge({ type }) {
  return (
    <span style={{ ...getBadgeStyle(type), fontSize:9, fontWeight:700, padding:'2px 8px', borderRadius:20, fontFamily:"'Syne',sans-serif", textTransform:'uppercase', letterSpacing:'0.5px' }}>
      {type || 'personal'}
    </span>
  )
}
