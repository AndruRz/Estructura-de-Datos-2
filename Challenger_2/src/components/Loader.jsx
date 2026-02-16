import './Loader.css';

function Loader() {
  return (
    <div className="loader-container">
      <div className="ghost">
        <div className="ghost-body">
          <div className="ghost-eyes">
            <div className="eye eye-left"></div>
            <div className="eye eye-right"></div>
          </div>
          <div className="ghost-mouth"></div>
        </div>
        <div className="ghost-tail">
          <div className="tail-part"></div>
          <div className="tail-part"></div>
          <div className="tail-part"></div>
          <div className="tail-part"></div>
        </div>
      </div>
      <p className="loading-text">Loading contacts...</p>
      <p className="author-text">Hecho por Andre Rodriguez</p>
    </div>
  );
}

export default Loader;