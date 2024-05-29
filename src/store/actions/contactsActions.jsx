import {
  FETCH_CONTACTS_SUCCESS,
  ADD_CONTACT_SUCCESS,
  UPDATE_CONTACT_SUCCESS,
  DELETE_CONTACT_SUCCESS,
} from '../actionTypes';

import axios from 'axios';

const apiBaseUrl = 'https://contact.herokuapp.com/contact';

export const fetchContacts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${apiBaseUrl}`);
      dispatch({ type: FETCH_CONTACTS_SUCCESS, payload: response.data.data });
    } catch (error) {
      console.error('Error fetching contacts:', error.message);
    }
  };
};

export const addContact = (contact) => {
  return async (dispatch) => {
    try {
      await axios.post(`${apiBaseUrl}`, contact, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      dispatch(fetchContacts());
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };
};

export const updateContact = (id, updatedContact) => {
  return async (dispatch) => {
    try {
      await axios.put(`${apiBaseUrl}/${id}`, updatedContact, {
        headers: { 'Content-Type': 'application/json' },
      });
      dispatch({ type: UPDATE_CONTACT_SUCCESS, payload: { ...updatedContact, id } });
    } catch (error) {
      console.error('Error updating contact:', error.message);
    }
  };
};

export const deleteContact = (id) => {
  return async (dispatch) => {
    try {
      console.log("hey : " + id)
      await axios.delete(`${apiBaseUrl}/${id}`);
      dispatch({ type: DELETE_CONTACT_SUCCESS, payload: id });
    } catch (error) {
      console.error('Error deleting contact:', error.message);
    }
  };
};
