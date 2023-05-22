import { useState } from "react";
import { updateTaskStatus } from "@/utils/data";
import { editTask } from "@/utils/data";

const Task = ({ task, isOwner, handleMoveUp, handleMoveDown }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskName, setNewTaskName] = useState(task.task_name);
  const handleStatusChange = async () => {
    if (!isOwner) return;

    const newStatus = !task.status;
    const updatedTask = await updateTaskStatus(task.task_id, newStatus);

    task.status = newStatus; // optimistically update the status in the UI
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e) => {
    setNewTaskName(e.target.value);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!isOwner) return;

    const updatedTask = await editTask(task.task_id, newTaskName);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setNewTaskName(task.task_name);
    setIsEditing(false);
  };

  return (
    <li className="flex items-center space-x-2">
      {isEditing ? (
        <form
          onSubmit={handleEditSubmit}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={newTaskName}
            onChange={handleNameChange}
            className="border-2 border-gray-300 p-2 rounded focus:border-blue-500 outline-none"
          />
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancelEdit}
            className="py-2 px-4 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <input
            type="checkbox"
            checked={task.status}
            onChange={handleStatusChange}
          />
          <span
            className={`flex-grow ${
              task.status === "done" ? "line-through" : ""
            }`}
          >
            {task.task_name}
          </span>
          <span className="text-xs text-gray-500">
            (status: {task.status ? "done" : "not done"})
          </span>
          {isOwner && (
            <>
              <button onClick={() => handleMoveUp(task)}>Move Up</button>
              <button onClick={() => handleMoveDown(task)}>Move Down</button>
              <button
                onClick={handleEditClick}
                className="py-1 px-2 bg-gray-200 text-gray-700 text-xs rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
              >
                Edit
              </button>
            </>
          )}
        </>
      )}
    </li>
  );
};

export default Task;
