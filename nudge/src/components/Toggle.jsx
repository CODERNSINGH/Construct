import React from 'react'

export default function Toggle({options,active,onChange}){
  return (
    <div className="toggle" role="tablist">
      {options.map(opt=> (
        <button key={opt} className={opt===active? 'active':''} onClick={()=>onChange(opt)}>{opt}</button>
      ))}
    </div>
  )
}
