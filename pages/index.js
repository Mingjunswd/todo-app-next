import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

// Dynamically import components
const TodoForm = dynamic(() => import('../src/components/TodoForm'));
const TodoList = dynamic(() => import('../src/components/TodoList'));

const Home = ({ initialTodos }) => {
    const [todos, setTodos] = useState(initialTodos);

    useEffect(() => {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
    }, []);

    useEffect(() => {
        if (todos.length) {
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }, [todos]);

    const addTodo = (todo) => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }
        const newTodos = [todo, ...todos];
        setTodos(newTodos);
    };

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }
        setTodos((prev) => prev.map((item) => (item.id === todoId ? newValue : item)));
    };

    const removeTodo = (id) => {
        const removedArr = [...todos].filter((todo) => todo.id !== id);
        setTodos(removedArr);
    };

    const completeTodo = (id) => {
        let updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    return (
        <div className="App">
            <Head>
                <title>Todo App</title>
                <meta name="description" content="A simple todo app built with Next.js" />
                <link rel="icon" href="/public/favicon.ico" />
                <link rel="manifest" href="/public/manifest.json" />
            </Head>
            <h1>What&apos;s the Plan for Today?</h1>
            <TodoForm onSubmit={addTodo} />
            <TodoList
                todos={todos}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
            />
        </div>
    );
};

// Using getServerSideProps for SSR to fetch todos from server
export async function getServerSideProps() {
    // Simulating an API call to fetch initial todos
    const initialTodos = [
        { id: 1, text: 'Learn Next.js', isComplete: false },
        { id: 2, text: 'Build a todo app', isComplete: false },
    ];
    return { props: { initialTodos } };
}

export default Home;
