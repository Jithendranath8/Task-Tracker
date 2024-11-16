import React from "react";

const TaskFilters = ({ filters, onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <select
        name="priority"
        value={filters.priority}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded-md"
      >
        <option value="">Filter by Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select
        name="status"
        value={filters.status}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded-md"
      >
        <option value="">Filter by Status</option>
        <option value="completed">Completed</option>
        <option value="notCompleted">Not Completed</option>
      </select>
      <select
        name="workType"
        value={filters.workType}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded-md"
      >
        <option value="">Filter by Work Type</option>
        <option value="self">Self</option>
        <option value="team">Team</option>
      </select>
      <input
        type="date"
        name="deadline"
        value={filters.deadline}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default TaskFilters;
