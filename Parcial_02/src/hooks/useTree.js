import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/configFirebase";
import { NaryTree } from "../tree/NaryTree";

export function useTree(user) {
  const [tree, setTree] = useState(new NaryTree());
  const [loading, setLoading] = useState(true);
  const COLLECTION = "arboles";

  useEffect(() => {
    if (!user) return;
    loadTree();
  }, [user]);

const loadTree = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, COLLECTION, user.email);
      const docSnap = await getDoc(docRef);
      const freshTree = new NaryTree();

      if (docSnap.exists()) {
        freshTree.loadFromJSON(docSnap.data().root);
      }

      setTree(freshTree);
    } catch (err) {
      console.error("Error cargando árbol:", err);
    } finally {
      setLoading(false);
    }
};

const saveTree = async (updatedTree) => {
    try {
      const docRef = doc(db, COLLECTION, user.email);
      await setDoc(docRef, {
        root: updatedTree.toJSON(),
        owner: user.email,
        updatedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Error guardando árbol:", err);
    }
};

const createRoot = async (name) => {
    if (tree.root) return { ok: false, msg: "Ya existe una raíz" };
    const newTree = new NaryTree();
    newTree.setRoot(name, "folder", user.email);
    setTree(newTree);
    await saveTree(newTree);
    return { ok: true };
};

const addNode = async (parentId, name, type) => {
    if (!user) return { ok: false, msg: "Debes iniciar sesión" };
    const result = tree.addChild(parentId, name, type, user.email);
    if (!result.ok) return result;
    const newTree = new NaryTree();
    newTree.root = tree.root;
    setTree(newTree);
    await saveTree(newTree);
    return { ok: true };
  };

  return { tree, loading, createRoot, addNode };
}