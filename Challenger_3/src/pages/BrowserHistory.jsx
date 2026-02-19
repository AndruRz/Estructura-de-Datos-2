import { useState } from "react";
import DoublyLinkedList from "../structures/DoublyLinkedList";
import browserHistory from "../data/browserHistory";
import "./BrowserHistory.css";

const BrowserHistory = () => {
  const [list] = useState(() => {
    const dll = new DoublyLinkedList();
    browserHistory.forEach((page) => dll.append(page));
    return dll;
  });

  const [currentNode, setCurrentNode] = useState(list.head);

  const handleBack = () => {
    if (currentNode.prev) setCurrentNode(currentNode.prev);
  };

  const handleForward = () => {
    if (currentNode.next) setCurrentNode(currentNode.next);
  };

  return (
    <div className="browser-container">
      <h1 className="browser-title">Browser History</h1>
      <p className="browser-subtitle">DOUBLY LINKED LIST — AVANZA Y RETROCEDE</p>

      <div className="browser-bar">
        <div className="browser-dot"></div>
        <span>🔒 {currentNode?.value.url}</span>
      </div>

      {currentNode && (
        <div className="page-card">
          <div className="page-icon">🌐</div>
          <h2 className="page-name">{currentNode.value.title}</h2>
          <p className="page-url">{currentNode.value.url}</p>
          <span className="page-time">🕐 {currentNode.value.visitedAt}</span>
        </div>
      )}

      <div className="browser-controls">
        <button className="btn-back" onClick={handleBack} disabled={!currentNode?.prev}>
          ⬅ Atrás
        </button>
        <button className="btn-forward" onClick={handleForward} disabled={!currentNode?.next}>
          Adelante ➡
        </button>
      </div>

      <p className="page-counter">
        {currentNode?.prev ? "← hay páginas anteriores" : "inicio del historial"} &nbsp;|&nbsp;
        {currentNode?.next ? "hay páginas siguientes →" : "fin del historial"}
      </p>
    </div>
  );
};

export default BrowserHistory;