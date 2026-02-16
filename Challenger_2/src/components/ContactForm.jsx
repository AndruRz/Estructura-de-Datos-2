import { useState } from 'react';
import './ContactForm.css';

function ContactForm({ onAddContact }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (name.trim() === '' || phone.trim() === '') {
      alert('⚠️ Por favor completa todos los campos');
      return;
    }

    const newContact = {
      id: Date.now(), 
      name: name.trim(),
      phone: phone.trim(),
    };

    onAddContact(newContact);

    setName('');
    setPhone('');
    
    alert('✅ Contacto agregado exitosamente');
  };

  return (
    <div className="contact-form-container">
      <button 
        className="toggle-form-button"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? '❌ Cerrar' : '➕ Agregar Contacto'}
      </button>

      {showForm && (
        <form className="contact-form" onSubmit={handleSubmit}>
          <h3 className="form-title">👻 Nuevo Contacto</h3>
          
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Andre Rodriguez"
              maxLength="50"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Teléfono:</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ej: +57 315 926 5443"
              maxLength="20"
            />
          </div>

          <button type="submit" className="submit-button">
            💾 Guardar Contacto
          </button>
        </form>
      )}
    </div>
  );
}

export default ContactForm;