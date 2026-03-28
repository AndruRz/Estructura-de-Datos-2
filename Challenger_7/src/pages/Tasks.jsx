import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
  const { user, logout } = useAuth();
  const { tasks, addTask, updateTask, deleteTask, toggleTask } = useTasks();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await addTask({ title, description, done: false });
    setTitle("");
    setDescription("");
  };

  const handleEdit = (task) => {
    setEditId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateTask(editId, { title: editTitle, description: editDescription });
    setEditId(null);
  };

  return (
    <div className="tasks-container">
        <div className="tasks-header">
        <div className="header-left">
            <h2>Mis Tareas</h2>
            <p>{tasks.length} tarea{tasks.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="header-right">
            <span>{user?.email}</span>
            <button onClick={handleLogout} className="btn-logout">
            Cerrar sesión
            </button>
        </div>
        </div>

      <form onSubmit={handleAdd} className="task-form">
        <input
          type="text"
          placeholder="Título de la tarea"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Descripción (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Agregar Tarea</button>
      </form>

      <div className="task-list">
        {tasks.length === 0 && (
          <p className="no-tasks">No tienes tareas aún. ¡Agrega una!</p>
        )}
        {tasks.map((task) => (
          <div key={task.id} className={`task-card ${task.done ? "done" : ""}`}>
            {editId === task.id ? (
              <form onSubmit={handleUpdate} className="edit-form">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                />
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <div className="task-actions">
                  <button type="submit" className="btn-save">Guardar</button>
                  <button type="button" onClick={() => setEditId(null)} className="btn-cancel">
                    Cancelar
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="task-info">
                  <h3 className={task.done ? "strikethrough" : ""}>{task.title}</h3>
                  {task.description && <p>{task.description}</p>}
                </div>
                <div className="task-actions">
                  <button
                    onClick={() => toggleTask(task.id, task.done)}
                    className={task.done ? "btn-undo" : "btn-done"}
                  >
                    {task.done ? "↩ Deshacer" : "✓ Completar"}
                  </button>
                  <button onClick={() => handleEdit(task)} className="btn-edit">
                    Editar
                  </button>
                  <button onClick={() => deleteTask(task.id)} className="btn-delete">
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;