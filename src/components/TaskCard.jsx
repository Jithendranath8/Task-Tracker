import React, { useState } from "react";

const TaskCard = ({ task, updateTask, deleteTask, toggleCompleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    priority: task.priority,
    deadline: task.deadline,
    type: task.type,
    assignee: task.assignee || "",
  });

  const [elapsedTime, setElapsedTime] = useState(null);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleEditSave = () => {
    updateTask(task.id, editedTask);
    setIsEditing(false);
  };

  const handleToggleComplete = () => {
    if (!task.completed) {
      // Calculate elapsed time
      const currentTime = Date.now();
      const elapsedMs = currentTime - task.id;

      // Convert milliseconds to human-readable time (HH:mm:ss)
      const hours = Math.floor(elapsedMs / (1000 * 60 * 60));
      const minutes = Math.floor((elapsedMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((elapsedMs % (1000 * 60)) / 1000);

      const formattedTime = `${hours}h ${minutes}m ${seconds}s`;

      // Set the elapsed time
      setElapsedTime(formattedTime);
    } else {
      // Clear the time tracker if task is uncompleted
      setElapsedTime(null);
    }

    toggleCompleted(task.id);
  };

  return (
    <div
      className={`p-4 border rounded-md flex flex-col justify-between ${
        task.completed ? "bg-green-100" : "bg-white"
      }`}
      style={{ minHeight: "250px" }}
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
          <select
            name="type"
            value={editedTask.type}
            onChange={handleEditChange}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="self">Self</option>
            <option value="team">Team Project</option>
          </select>
          {editedTask.type === "team" && (
            <input
              type="text"
              name="assignee"
              placeholder="Assignee"
              value={editedTask.assignee}
              onChange={handleEditChange}
              className="p-2 border border-gray-300 rounded-md"
            />
          )}
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
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <button
              onClick={handleToggleComplete}
              className={`px-2 py-1 text-sm rounded ${
                task.completed
                  ? "bg-red-500 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              {task.completed ? "Undo" : "Complete"}
            </button>
          </div>
          <p className="text-black text-xl">Description:</p>
          <p className="text-gray-600 mb-4 text-sm">{task.description}</p>

          <div className="mt-auto flex justify-between items-end">
            <div className="text-left">

              <p className="text-black">Priority: {task.priority}</p>
              <p className="text-black">Deadline: {task.deadline}</p>
              <p className="text-black">
                Type: {task.type === "team" ? "Team Project" : "Self"}
              </p>
              {task.type === "team" && (
                <p className="text-black">
                  Assignee: {task.assignee || "Not Assigned"}
                </p>
              )}
            </div>
            <div className="flex gap-2">
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
          </div>
          <div className="text-center mt-4">
            {elapsedTime && (
              <p className="text-sm font-medium text-gray-700">
                Time spent: {elapsedTime}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;
