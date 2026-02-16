import './ContactItem.css';

function ContactItem({ contact, onDelete }) {
  return (
    <div className="contact-card">
      <div className="contact-avatar">
        {contact.name.charAt(0).toUpperCase()}
      </div>
      
      <div className="contact-info">
        <h3 className="contact-name">{contact.name}</h3>
        <p className="contact-phone">📞 {contact.phone}</p>
      </div>
      
      <button 
        className="delete-button"
        onClick={() => onDelete(contact.id)}
        title="Eliminar contacto"
      >
        🗑️
      </button>
    </div>
  );
}

export default ContactItem;