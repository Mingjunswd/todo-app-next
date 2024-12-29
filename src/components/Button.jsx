import React from "react"

export default function Button(props) {
  const { type = 'submit', className, children } = props;


  return (
    <button type={type} className={'todo-button ' + className}>
      {children}
    </button>
  )
}