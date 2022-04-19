import React from 'react';
import './Card.css'

const Card = (props) => {

  const extraClasses = props.className || ''

  return (
    <div className={`${extraClasses} card`}>{props.children}</div>
  )
}

export default Card