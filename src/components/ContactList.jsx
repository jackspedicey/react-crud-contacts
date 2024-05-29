// src/components/ContactList.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, fetchContacts } from '../store/actions/contactsActions';
import ContactModal from './ContactModal';
import './ContactList.css';

function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.contacts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const openAddModal = () => {
    setIsEditing(false);
    setCurrentContact(null);
    setIsModalOpen(true);
  };

  const openEditModal = (contact) => {
    setIsEditing(true);
    setCurrentContact(contact);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <div className="container">
      <div className="add-contact">
        <button onClick={openAddModal}>Add Contact</button>
      </div>

      <div className="contact-list">
        <h1>Contact List</h1>
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
              <img src={contact.photo !== 'N/A' ? contact.photo : 'https://picsum.photos/200'} alt={`${contact.firstName} ${contact.lastName}`} />
              <div>{contact.firstName} {contact.lastName}</div>
              <div>Age: {contact.age}</div>
              <button onClick={() => openEditModal(contact)}>Edit</button>
              <button onClick={() => handleDelete(contact.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <ContactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contact={currentContact}
        isEditing={isEditing}
      />
    </div>
  );
}

export default ContactList;
