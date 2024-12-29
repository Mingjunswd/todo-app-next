import React, { useState } from 'react';
import Input from "./Input";
import Button from "./Button";

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');
  const [error, setError] = useState('');

  const handleChange = e => {
    setInput(e.target.value);
    setError(''); // Clear the error message when the user starts typing
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Validation: Check if input meets the conditions
    if (!input || input.length < 5 || input.length > 150 || /\d|[^a-zA-Z\s]/.test(input)) {
      setError('Please enter a valid task: text only, 5-150 characters.');
      return;
    }

    // Pass the valid input to the parent component
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input
    });

    setInput('');
  };

  return (
      <form onSubmit={handleSubmit} className='todo-form'>
        {props.edit ? (
            <>
              <Input
                  placeholder='Update your item'
                  value={input}
                  onChange={handleChange}
                  name='text'
                  className='edit'
              />
              <Button className='edit'>
                Update
              </Button>
            </>
        ) : (
            <>
              <Input
                  placeholder='Add a todo'
                  value={input}
                  onChange={handleChange}
                  name='text'
              />
              <Button>
                Add todo
              </Button>
            </>
        )}

        {error && <p className="error-message">{error}</p>}
      </form>
  );
}

export default TodoForm;
