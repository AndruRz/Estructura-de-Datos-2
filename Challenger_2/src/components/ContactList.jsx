import './ContactList.css';
import ContactItem from './ContactItem';

function ContactList({ contacts, onDeleteContact }) {
  return (
    <div className="contact-list-container">
      <h2 className="contact-list-title">
        Mis Contactos ({contacts.length})
      </h2>
      {contacts.length === 0 ? (
        <p className="no-contacts">No hay contactos aún. ¡Agrega uno!</p>
      ) : (
        <div className="contacts-grid">
          {contacts.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              onDelete={onDeleteContact}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ContactList;