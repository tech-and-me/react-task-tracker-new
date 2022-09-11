import React from 'react'

const Button = ({btnLabel,color,toggleForm}) => {
  return (
    <button className="btn" 
    style={{backgroundColor:color}}
    onClick={toggleForm}
    >{btnLabel}</button>
  )
}

export default Button