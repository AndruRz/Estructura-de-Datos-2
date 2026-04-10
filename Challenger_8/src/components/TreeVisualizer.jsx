import Tree from "react-d3-tree";
import "../index.css";

const NodeElement = ({ nodeDatum }) => {
  const isLeaf = !nodeDatum.children || nodeDatum.children.length === 0;

  return (
    <g>
      <circle
        r={28}
        fill={isLeaf ? "#f67280" : "#6c63ff"}
        stroke="#ffffff"
        strokeWidth={2.5}
      />
      <foreignObject x={-20} y={-14} width={40} height={28}>
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style={{
            width: "40px",
            height: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: "bold",
            fontFamily: "Arial, sans-serif",
            userSelect: "none",
          }}
        >
          {nodeDatum.name}
        </div>
      </foreignObject>
    </g>
  );
};

function TreeVisualizer({ data }) {
  return (
    <div
      style={{
        width: "100%",
        height: "500px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        backgroundColor: "#1e1e2e",
        marginTop: "20px",
      }}
    >
        <Tree
        data={data}
        orientation="vertical"
        translate={{ x: 400, y: 80 }}
        zoom={0.9}
        nodeSize={{ x: 100, y: 100 }}
        pathClassFunc={() => "rd3t-link"}  // <- agrega esto
        renderCustomNodeElement={(rd3tProps) => (
            <NodeElement {...rd3tProps} />
        )}
        />
    </div>
  );
}

export default TreeVisualizer;