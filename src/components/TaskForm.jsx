import React, { useState } from "react";

const TaskForm = ({ addTask }) => {
  const [isTeamProject, setIsTeamProject] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.taskTitle.value;
    const priority = form.taskPriority.value;
    const deadline = form.taskDeadline.value;
    const description = form.taskDescription.value;
    const type = form.taskType.value;
    const assignee = type === "team" ? form.taskAssignee?.value : null;

    if (!title || !priority || !deadline || !type || (type === "team" && !assignee)) {
      alert("Please fill out all required fields.");
      return;
    }

    addTask({ title, priority, deadline, description, type, assignee });
    form.reset();
    setIsTeamProject(false);
  };

  const handleTypeChange = (e) => {
    setIsTeamProject(e.target.value === "team");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
      <input
        type="text"
        name="taskTitle"
        placeholder="Task Title"
        className="p-2 border border-gray-300 rounded-md"
      />
      <textarea
        name="taskDescription"
        placeholder="Task Description"
        className="p-2 border border-gray-300 rounded-md resize-none"
        rows="3"
      ></textarea>
      <div className="flex flex-col md:flex-row gap-4">
        <select
          name="taskPriority"
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select
          name="taskType"
          onChange={handleTypeChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">Work Type</option>
          <option value="self">Self</option>
          <option value="team">Team</option>
        </select>
        {isTeamProject && (
          <input
            type="text"
            name="taskAssignee"
            placeholder="Assignee To"
            className="p-2 border border-gray-300 rounded-md"
          />
        )}
        <input
          type="date"
          name="taskDeadline"
          className="p-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
