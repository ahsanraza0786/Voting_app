 'use client'
import React from 'react'

export default function Modal({ open, title, children, onClose }){
  if(!open) return null;
  return (
    <div className="cand-modal-backdrop" onClick={onClose}>
      <div className="cand-modal" onClick={(e)=>e.stopPropagation()}>
        <div className="cand-modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="cand-modal-body">{children}</div>
      </div>
    </div>
  )
}
