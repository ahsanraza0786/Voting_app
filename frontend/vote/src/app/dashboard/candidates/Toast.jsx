 'use client'
import React, { useEffect } from 'react'

export default function Toast({ message, type='info', onClose }){
  useEffect(()=>{
    if(!message) return;
    const t = setTimeout(()=> onClose && onClose(), 3500);
    return ()=> clearTimeout(t);
  },[message])

  if(!message) return null;
  return (
    <div className={`cand-toast cand-toast-${type}`} role="status">
      {message}
      <button className="toast-close" onClick={onClose}>×</button>
    </div>
  )
}
