import { useState } from "react";
import "./Sidebar.css";

const MenuItem = ({ node, depth = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  const depthClass = depth === 0 ? "" : depth === 1 ? "depth-1" : "depth-2";

  return (
    <div className="menu-item-wrapper">
      <div
        className={`menu-item-row ${depthClass} ${!hasChildren ? "no-children" : ""}`}
        style={{ paddingLeft: `${16 + depth * 20}px` }}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        <div className="menu-item-left">
          {depth > 0 && <span className="menu-dot" />}
          <span>{node.title}</span>
        </div>

        {hasChildren && (
          <span className={`menu-arrow ${isOpen ? "open" : ""}`}>▼</span>
        )}
      </div>

      {hasChildren && isOpen && (
        <div
          className="submenu-container"
          style={{ marginLeft: `${24 + depth * 20}px` }}
        >
          {node.children.map((child, index) => (
            <MenuItem key={index} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ tree }) => {
  if (!tree || !tree.root) return null;
  const rootNode = tree.root;

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-header-content">
          <div className="sidebar-icon">🌳</div>
          <div>
            <p className="sidebar-title">{rootNode.title}</p>
            <p className="sidebar-subtitle">N-ary Tree Menu</p>
          </div>
        </div>
      </div>

      <div className="sidebar-menu">
        {rootNode.children.map((child, index) => (
          <MenuItem key={index} node={child} depth={0} />
        ))}
      </div>

      <div className="sidebar-footer">Challenge 09 - N-ary Tree</div>
    </div>
  );
};

export default Sidebar;