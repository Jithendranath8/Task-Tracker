import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskForm from "./TaskForm";
import TaskFilters from "./TaskFilters";
import TaskList from "./TaskList";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({
    priority: "",
    status: "",
    deadline: "",
    workType: "",
  });

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now(), completed: false }]);
    toast.success('Task added successfully',{autoClose:1500});
  };

  const toggleCompleted = (id) => {
    const taskToToggle = tasks.find(task => task.id === id);
    if (taskToToggle) {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
      toast.info(`Task marked as ${taskToToggle.completed ? 'incomplete' : 'complete'}`,{autoClose:1500});
    }
  };

  const deleteTask = (id) => {
    const taskToDelete = tasks.find(task => task.id === id);
    if (taskToDelete) {
      setTasks(tasks.filter((task) => task.id !== id));
      toast.error(`Task deleted successfully`,{autoClose:1500});
    }
  };

  const updateTask = (id, updatedFields) => {
    const taskToUpdate = tasks.find(task => task.id === id);
    if (taskToUpdate) {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, ...updatedFields } : task
        )
      );
      toast.info(`Task updated successfully`,{autoClose:1500});
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
    toast.info(`Filter applied: ${name} - ${value}`,{autoClose:1500});
  };

  const filteredTasks = tasks.filter((task) => {
    return (
      (filters.priority ? task.priority === filters.priority : true) &&
      (filters.status
        ? filters.status === "completed"
          ? task.completed
          : !task.completed
        : true) &&
      (filters.deadline
        ? new Date(task.deadline) <= new Date(filters.deadline)
        : true) &&
      (filters.workType ? task.type === filters.workType : true)
    );
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <ToastContainer />
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Task/Bug Dashboard
        </h1>
        <TaskForm addTask={addTask} />
        <TaskFilters filters={filters} onFilterChange={handleFilterChange} />
        <TaskList
          tasks={filteredTasks}
          toggleCompleted={toggleCompleted}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
      </div>

      {/* Scroll to Top*/}
      <button 
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-3xl shadow-lg hover:bg-blue-600 transition duration-200"
        aria-label="Scroll to top"
      >
        ↑
      </button>
    </div>
  );
};

export default Dashboard;