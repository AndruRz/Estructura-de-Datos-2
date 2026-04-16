import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/configFirebase";
import { useAuth } from "../context/AuthContext";
import { useTree } from "../hooks/useTree";
import TreeNode from "../components/TreeNode";
import AddNodeModal from "../components/AddNodeModal";

function Home() {
const { user } = useAuth();
const { tree, loading, createRoot, addNode } = useTree(user);
const [selectedParentId, setSelectedParentId] = useState(null);
const [rootName, setRootName] = useState("");

const handleOpenModal = (parentId) => {
    setSelectedParentId(parentId);
};

const handleCloseModal = () => {
    setSelectedParentId(null);
};

const handleConfirm = async (name, type) => {
    const result = await addNode(selectedParentId, name, type);
    if (!result.ok) alert(result.msg);
    handleCloseModal();
};

const handleCreateRoot = async () => {
    if (!rootName.trim()) return;
    await createRoot(rootName.trim());
    setRootName("");
};

  if (loading) return <p className="loading">Cargando tu sistema...</p>;

return (
    <div className="home-container">
      <header className="app-header">
        <h1>Gestor de Archivos</h1>
        <div className="header-user">
          <span>{user.email}</span>
          <button onClick={() => signOut(auth)}>Cerrar sesión</button>
        </div>
      </header>

      <main className="tree-container">
        {!tree.root ? (
          <div className="create-root">
            <p>No tienes ningún sistema creado aún.</p>
            <input
              type="text"
              placeholder="Nombre de la carpeta raíz..."
              value={rootName}
              onChange={(e) => setRootName(e.target.value)}
            />
            <button onClick={handleCreateRoot}>Crear raíz</button>
          </div>
        ) : (
          <TreeNode
            node={tree.root}
            onAddNode={handleOpenModal}
          />
        )}
      </main>

      {selectedParentId && (
        <AddNodeModal
          onConfirm={handleConfirm}
          onCancel={handleCloseModal}
        />
      )}
    </div>
);
}

export default Home;