import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/configFirebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const TEST_EMAIL = "pablorodriguezperez69@gmail.com";
  const TEST_PASSWORD = "Andre123";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError("Correo o contraseña incorrectos");
    }
  };

  const fillTestCredentials = () => {
    setEmail(TEST_EMAIL);
    setPassword(TEST_PASSWORD);
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error-msg">{error}</p>}
        <button type="submit">Entrar</button>
      </form>

      <div className="test-credentials">
        <p className="test-label">— Datos de prueba —</p>
        <p className="test-label">(Me da pereza anotar manualmente)</p>
        <div className="test-info">
          <span><strong>Correo:</strong> {TEST_EMAIL}</span>
          <span><strong>Contraseña:</strong> {TEST_PASSWORD}</span>
        </div>
        <button className="btn-test" onClick={fillTestCredentials}>
          Usar credenciales de prueba
        </button>
      </div>
    </div>
  );
}

export default Login;