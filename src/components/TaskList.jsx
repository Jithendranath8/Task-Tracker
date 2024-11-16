import React from "react";
import TaskCard from "./TaskCard";

const TaskList = ({ tasks, toggleCompleted, deleteTask, updateTask }) => {
  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          toggleCompleted={toggleCompleted}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
