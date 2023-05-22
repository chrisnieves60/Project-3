"use client";
import { useEffect, useState } from "react";
import {
  getLists,
  getTasksForList,
  createTask,
  updateTaskOrder,
} from "../utils/data";
import Task from "./Task";

const List = ({ userId, listId, isOwner }) => {
  const [list, setList] = useState();
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (!listId || !userId) return;
    const fetchData = async () => {
      const fetchedTasks = await getTasksForList(listId);
      setList(listId);
      setTasks(fetchedTasks);
    };
    fetchData();
  }, [userId, listId, tasks]);

  const addTask = async (e) => {
    e.preventDefault();
    const newTask = await createTask(listId, newTaskName);

    setNewTaskName("");
    setIsAdding(false);
  };

  const handleMoveUp = async (task) => {
    const taskIndex = tasks.findIndex((t) => t.task_id === task.task_id);
    if (taskIndex > 0) {
      // Ensure this isn't the first task
      const otherTask = tasks[taskIndex - 1];

      // Swap their 'order' fields
      [task.order, otherTask.order] = [otherTask.order, task.order];

      // Update the 'order' field of each task in the database
      await updateTaskOrder(task.task_id, task.order);
      await updateTaskOrder(otherTask.task_id, otherTask.order);

      // Re-sort the tasks array and update the tasks state
      setTasks([...tasks].sort((a, b) => a.order - b.order));
    }
  };

  const handleMoveDown = async (task) => {
    const taskIndex = tasks.findIndex((t) => t.task_id === task.task_id);
    if (taskIndex < tasks.length - 1) {
      // Ensure this isn't the last task
      const otherTask = tasks[taskIndex + 1];

      // Swap their 'order' fields
      [task.order, otherTask.order] = [otherTask.order, task.order];

      // Update the 'order' field of each task in the database
      await updateTaskOrder(task.task_id, task.order);
      await updateTaskOrder(otherTask.task_id, otherTask.order);

      // Re-sort the tasks array and update the tasks state
      setTasks([...tasks].sort((a, b) => a.order - b.order));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2">
      {!list ? (
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => {
            return (
              <Task
                key={task.task_id}
                task={task}
                isOwner={isOwner}
                handleMoveUp={handleMoveUp}
                handleMoveDown={handleMoveDown}
              />
            );
          })}
        </ul>
      )}
      {isOwner &&
        (isAdding ? (
          <form onSubmit={addTask} className="mt-4">
            <input
              type="text"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              placeholder="Enter new task name"
              required
              className="px-3 py-2 placeholder-gray-500 text-gray-700 relative bg-white text-sm outline-none focus:outline-none focus:ring w-full pr-10"
            />
            <button
              type="submit"
              className="mt-2 px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="mt-4 px-6 py-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            Add New Task
          </button>
        ))}
    </div>
  );
};

export default List;
