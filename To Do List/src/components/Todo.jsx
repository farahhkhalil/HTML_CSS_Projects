'use client'

import React, { useRef, useState, useEffect } from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'

const Todo = () => {
  const inputref = useRef()
  const [todoList, setTodoList] = useState(localStorage.getItem('todoList') ? JSON.parse(localStorage.getItem('todoList')) : [])

  const add = () => {
    const inputText = inputref.current.value.trim()

    if (inputText === '') {
      return
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isCompleted: false,
    }

    setTodoList((prev) => [...prev, newTodo])
    inputref.current.value = ''
  }

  const deleteTodo = (id) => {
    setTodoList((prevTodoList) => {
      return prevTodoList.filter((todo) => todo.id !== id)
    })
  }

  const toggleComplete = (id) => {
    setTodoList((prevTodoList) => {
      return prevTodoList.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isCompleted: !todo.isCompleted }
        }

        return todo
      })
    })
  }

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList))
  }, [todoList])

  return (
    <div className='bg-white place-self-center p-4 rounded-xl shadow-md w-10/12 max-w-md flex flex-col min-h-[550px]'>
      <div className='flex items-center mt-2 gap-2'>
        <img src={todo_icon} alt="Todo Icon" className='w-8' />
        <h1 className='text-3xl font-semibold'>To-Do List</h1>
      </div>

      <div className='flex items-center gap-2 mt-4'>
        <input
          ref={inputref}
          className='bg-pink-800 border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-white  rounded-xl'
          type="text"
          placeholder='Add your tasks...'
        />

        <button
          onClick={add}
          className='border-none rounded-full bg-pink-800 w-32 h-14 text-white text-lg font-medium cursor-pointer'
        >
          Add+
        </button>
      </div>

      <div>
        {todoList.map((todo) => (
          <TodoItems
            key={todo.id}
            text={todo.text}
            isCompleted={todo.isCompleted}
            id={todo.id}
            onDelete={deleteTodo}
            onToggleComplete={toggleComplete}
          />
        ))}
      </div>
    </div>
  )
}

export default Todo