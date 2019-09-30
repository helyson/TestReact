import React from 'react'

import './Button.css'

interface ButtonProps {
  type: string;
  onClick: () => void;
  children: string;
 }

const Button: React.FC<ButtonProps> = ({ type, onClick, children }) => {
  return (
    <button className={`button button-${type}`} onClick={onClick}>{children}</button>
  )
}

export default Button
