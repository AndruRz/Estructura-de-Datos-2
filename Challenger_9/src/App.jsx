import Sidebar from "./components/Sidebar";
import { buildMenuTree } from "./utils/NaryTree";
import "./App.css";

const tree = buildMenuTree();

function App() {
  return (
    <div className="app-container">
      <Sidebar tree={tree} />

      <div className="main-content">
        <h1 className="main-title">Challenge 09 - N-ary Tree Sidebar</h1>

        <div className="info-card">
          <h2>¿Cómo funciona?</h2>
          <p>
            El sidebar de la izquierda está construido a partir de un
            <strong> árbol N-ario</strong>. Cada nodo del árbol representa
            un item del menú con su título, link y componente asociado.
          </p>
          <p>
            Haz clic en los items que tienen submenús para expandirlos
            y ver sus hijos. El componente <strong>MenuItem</strong> es
            recursivo, lo que significa que puede renderizar cualquier
            nivel de profundidad del árbol.
          </p>
        </div>

        <div className="info-card">
          <h2>Estructura del árbol N-ario</h2>
          <pre className="tree-preview">
{
`Dashboard (root)
├── Profile
│   ├── My Info
│   └── Avatar
├── Messages
│   ├── Inbox
│   ├── Sent
│   └── Drafts
├── Settings
│   ├── Account
│   │   ├── Billing
│   │   └── Notifications
│   └── Security & Privacy
│       ├── Password
│       └── Two Factor Auth
├── Help
│   ├── FAQ's
│   ├── Submit a Ticket
│   └── Network Status
└── Logout`
  }
          </pre>
        </div>
      </div>
    </div>
  );
}

export default App;