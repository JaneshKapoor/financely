import React from 'react'
import "./styles.css"

function Input({label, state, setState, placeholder}) {
  return (
    <div className='input-wrapper'>
        <p className='label-input'>{label}</p>
        <input className='custom-input' value={state} placeholder={placeholder} onChange={(e) => setState(e.target.value)}/>
    </div>
  )
}

export default Input
