import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { addContact, updateContact } from '../store/actions/contactsActions';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '90%', // Adjust width for mobile
    maxWidth: '500px', // Adjust max-width for desktop
    padding: '20px',
    borderRadius: '10px',
  },
};

const ContactModal = ({ isOpen, onRequestClose, contact, isEditing }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [photo, setPhoto] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEditing && contact) {
      setFirstName(contact.firstName);
      setLastName(contact.lastName);
      setAge(contact.age);
      setPhoto(contact.photo);
    } else {
      setFirstName('');
      setLastName('');
      setAge('');
      setPhoto('');
    }
  }, [isEditing, contact]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(updateContact(contact.id, { firstName, lastName, age, photo }));
    } else {
      dispatch(addContact({ firstName, lastName, age, photo }));
    }
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel={isEditing ? 'Edit Contact' : 'Add Contact'}
    >
      <h2>{isEditing ? 'Edit Contact' : 'Add Contact'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" required />
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" required />
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" required />
        <input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} placeholder="Photo URL" required />
        <button type="submit">{isEditing ? 'Update Contact' : 'Add Contact'}</button>
        <button type="button" onClick={onRequestClose}>Cancel</button>
      </form>
    </Modal>
  );
};

export default ContactModal;
