import React, { useEffect, useRef } from "react"

export default function Input(props) {
  const {value, onChange, placeholder, name, className} = props;
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      type='text'
      className={'todo-input ' + className}
      ref={inputRef}
    />
  )
}