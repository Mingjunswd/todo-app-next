import React, { useState } from 'react';
import TodoForm from './TodoForm';
import TodoItem from "./TodoItem";

const TodoList = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  //edit
  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate}/>;
  }

  return todos.map((todo, index) => (
    <TodoItem
      todo={todo}
      index={index}
      completeTodo={completeTodo}
      removeTodo={removeTodo}
      setEdit={setEdit}
    />

  ));
};

export default TodoList;
