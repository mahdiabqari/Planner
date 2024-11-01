'use client'
// components/Planner.js 
import React, { useState, useEffect } from 'react'; 

const Planner = () => { 
  const [tasks, setTasks] = useState(() => { 
    const savedTasks = localStorage.getItem('tasks'); 
    return savedTasks ? JSON.parse(savedTasks) : []; 
  }); 
  const [taskInput, setTaskInput] = useState(''); 
  const [editIndex, setEditIndex] = useState(null); 
  const [dueDate, setDueDate] = useState(''); 
  const [filter, setFilter] = useState('all'); 
  const [searchTerm, setSearchTerm] = useState(''); 

  useEffect(() => { 
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
  }, [tasks]); 

  const addOrUpdateTask = () => { 
    if (taskInput) { 
      if (editIndex !== null) { 
        const updatedTasks = tasks.map((task, index) => 
          index === editIndex ? { ...task, name: taskInput, dueDate } : task 
        ); 
        setTasks(updatedTasks); 
        setEditIndex(null); 
      } else { 
        setTasks([...tasks, { name: taskInput, dueDate, completed: false }]); 
      } 
      setTaskInput(''); 
      setDueDate(''); 
    } 
  }; 

  const editTask = (index) => { 
    setTaskInput(tasks[index].name); 
    setDueDate(tasks[index].dueDate); 
    setEditIndex(index); 
  }; 

  const deleteTask = (index) => { 
    const updatedTasks = tasks.filter((_, i) => i !== index); 
    setTasks(updatedTasks); 
  }; 

  const toggleComplete = (index) => { 
    const updatedTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task 
    ); 
    setTasks(updatedTasks); 
  }; 

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true; // all tasks
  }).filter(task => task.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return ( 
    <div className="root max-w-md mx-auto mt-10 p-5 border border-black rounded-lg bg-black text-white"> 
      <h1 className="text-2xl font-bold text-red-600 mb-4">Daily Planner</h1> 

      <input 
        type="text" 
        value={taskInput} 
        onChange={(e) => setTaskInput(e.target.value)} 
        className="w-full p-2 mb-2 border border-red-600 rounded" 
        placeholder="Add a new task..." 
      /> 

      <input 
        type="date" 
        value={dueDate} 
        onChange={(e) => setDueDate(e.target.value)} 
        className="w-full p-2 mb-4 border border-red-600 rounded" 
      /> 

      <button 
        onClick={addOrUpdateTask} 
        className="w-full p-2 bg-red-600 text-white rounded hover:bg-red-700" 
      > 
        {editIndex !== null ? 'Update Task' : 'Add Task'} 
      </button> 

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-2 border border-red-600 rounded mt-10"
        placeholder="Search tasks..."
      />

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full p-2 mb-4 border border-red-600 bg-gray-400 text-black font-bold rounded"
      >
        <option value="all">All Tasks</option>
        <option value="completed">Completed Tasks</option>
        <option value="incomplete">Incomplete Tasks</option>
      </select>

      <ul className="mt-0 h-[20rem] overflow-y-scroll border-t-2 border-t-red-800 pt-10"> 
        {filteredTasks.map((task, index) => ( 
          <li key={index} className={`border-b-2 border-gray-400 bg-gray-800 my-4 py-4 px-4 text-white rounded-lg pb-3 py-2 flex justify-between ${task.completed ? 'line-through text-gray-400' : ''}`}> 
            <div> 
              <span className='font-bold'>{task.name}</span> {task.dueDate && <span className="text-gray-400">({task.dueDate})</span>}            </div> 
            <div> 
              <button onClick={() => toggleComplete(index)} className="text-green-500 hover:underline mx-2">{task.completed ? 'Undo' : 'Complete'}</button> 
              <button onClick={() => editTask(index)} className="text-blue-500 hover:underline mx-2">Edit</button> 
              <button onClick={() => deleteTask(index)} className="text-red-500 hover:underline">Delete</button> 
            </div> 
          </li> 
        ))} 
      </ul> 
    </div> 
  ); 
}; 

export default Planner;
