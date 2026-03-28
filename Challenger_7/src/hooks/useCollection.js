import { db } from "../firebase/config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where
} from "firebase/firestore";

export const useCollection = (collectionName) => {
  const getAll = async (filters = []) => {
    let q = collection(db, collectionName);
    if (filters.length > 0) {
      const conditions = filters.map(([field, op, val]) =>
        where(field, op, val)
      );
      q = query(q, ...conditions);
    }
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  };

  const add = (data) => addDoc(collection(db, collectionName), data);

  const update = (id, data) =>
    updateDoc(doc(db, collectionName, id), data);

  const remove = (id) => deleteDoc(doc(db, collectionName, id));

  return { getAll, add, update, remove };
};