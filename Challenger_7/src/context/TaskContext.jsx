import { createContext, useContext, useEffect, useState } from "react";
import { useCollection } from "../hooks/useCollection";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const { getAll, add, update, remove } = useCollection("tasks");

  const loadTasks = async () => {
    const data = await getAll();
    setTasks(data);
  };

  const addTask = async (task) => {
    await add(task);
    await loadTasks();
  };

  const updateTask = async (id, data) => {
    await update(id, data);
    await loadTasks();
  };

  const deleteTask = async (id) => {
    await remove(id);
    await loadTasks();
  };

  const toggleTask = async (id, done) => {
    await update(id, { done: !done });
    await loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask, toggleTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);