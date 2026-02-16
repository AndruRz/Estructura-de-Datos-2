import { useState, useEffect } from 'react';
import './App.css';
import Loader from './components/Loader';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

function App() {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      const initialContacts = [
        { id: 1, name: 'Andre Rodriguez', phone: '+57 315 926 5443' },
        { id: 2, name: 'Juan Pérez', phone: '+57 300 123 4567' },
        { id: 3, name: 'María García', phone: '+57 310 987 6543' },
        { id: 4, name: 'Carlos López', phone: '+57 320 456 7890' },
      ];
      
      setContacts(initialContacts);
      setLoading(false);
    }, 2000);
  }, []);

  const handleAddContact = (newContact) => {
    setContacts([newContact, ...contacts]); 
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <div className="app-header">
        <h1 className="app-title">👻 Ghostrx Contacts</h1>
        <p className="app-subtitle">Gestiona tus contactos de forma fantasmal</p>
      </div>

      <ContactForm onAddContact={handleAddContact} />
      
      <ContactList 
        contacts={contacts} 
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
}

export default App;