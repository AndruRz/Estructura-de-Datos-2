import { useState } from "react";

function AddNodeModal({ onConfirm, onCancel }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("folder"); 

  const handleSubmit = () => {
    if (!name.trim()) return;
    onConfirm(name.trim(), type);
    setName("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Nuevo elemento</h3> 

        <input
          type="text"
          placeholder="Nombre..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />

        <div className="modal-type-selector">
          <label>
            <input
              type="radio"
              value="folder"
              checked={type === "folder"}
              onChange={() => setType("folder")}
            />
            🗀 Carpeta
          </label>
          <label>
            <input
              type="radio"
              value="file"
              checked={type === "file"}
              onChange={() => setType("file")}
            />
            📄 Archivo
          </label>
        </div>

        <div className="modal-actions">
          <button className="btn-confirm" onClick={handleSubmit}>Crear</button>
          <button className="btn-cancel" onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default AddNodeModal;