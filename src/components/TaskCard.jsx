import React, { useState } from "react";

const TaskCard = ({ task, updateTask, deleteTask, toggleCompleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    priority: task.priority,
    deadline: task.deadline,
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleEditSave = () => {
    updateTask(task.id, editedTask);
    setIsEditing(false);
  };

  return (
    <div
      className={`p-4 border rounded-md ${
        task.completed ? "bg-green-100" : "bg-white"
      }`}
    >
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleEditChange}
            className="p-2 border border-gray-300 rounded-md"
          />
          <select
            name="priority"
            value={editedTask.priority}
            onChange={handleEditChange}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            type="date"
            name="deadline"
            value={editedTask.deadline}
            onChange={handleEditChange}
            className="p-2 border border-gray-300 rounded-md"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleEditSave}
              className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-2 py-1 bg-gray-300 text-black rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h3 className="text-lg font-semibold flex justify-between items-center">
            {task.title}
            <button
              onClick={() => toggleCompleted(task.id)}
              className={`px-2 py-1 text-sm rounded ${
                task.completed
                  ? "bg-red-500 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              {task.completed ? "Undo" : "Complete"}
            </button>
          </h3>
          <p className="text-gray-600 mb-2">{task.description}</p>
          <p className="text-black">Priority: {task.priority}</p>
          <p className="text-black">Deadline: {task.deadline}</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setIsEditing(true)}
              className="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;
