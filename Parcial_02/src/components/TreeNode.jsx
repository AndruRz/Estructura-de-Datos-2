import { useState } from "react";

const ICONS = {
  folder_open: "🗁",
  folder_closed: "🗀",
  file: "📄",
};

function TreeNode({ node, onAddNode }) {
  const [expanded, setExpanded] = useState(true);
  const isFolder = node.type === "folder";
  const handleToggle = () => {
    if (isFolder) setExpanded((prev) => !prev);
  };

return (
    <div className="tree-node">
      <div className={`node-header ${node.type}`} onClick={handleToggle}>
        <span className="node-icon">
          {isFolder
            ? expanded
              ? ICONS.folder_open
              : ICONS.folder_closed
            : ICONS.file}
        </span>
        <span className="node-name">{node.name}</span>

        {isFolder && (
          <button
            className="btn-add"
            onClick={(e) => {
              e.stopPropagation();
              onAddNode(node.id);
            }}
            title="Agregar elemento"
          >
            +
          </button>
        )}
      </div>

      {isFolder && expanded && node.children.length > 0 && (
        <div className="node-children">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              onAddNode={onAddNode}
            />
          ))}
        </div>
      )}

      {isFolder && expanded && node.children.length === 0 && (
        <p className="empty-folder">— vacío —</p>
      )}
    </div>
  );
}

export default TreeNode;