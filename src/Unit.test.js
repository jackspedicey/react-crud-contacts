import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import ContactList from './components/ContactList';

const mockStore = configureMockStore();

describe('ContactList Component', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      contacts: {
        contacts: [
          {
            id: '1',
            firstName: 'Alex',
            lastName: 'Pereira',
            age: 36,
            photo: 'https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2024-04/PEREIRA_ALEX_L_BELT_04-13.png?itok=-zKSPFcu',
          },
          {
            id: '2',
            firstName: 'Jon',
            lastName: 'Jones',
            age: 36,
            photo: 'https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-03/JONES_JON_L_BELT_03_04.png?itok=P6J6DQpm',
          },
        ],
      },
    });

    component = render(
      <Provider store={store}>
        <ContactList />
      </Provider>
    );
  });

  it('renders contact list items', () => {
    const { getByText } = component;
    expect(getByText('Alex Pereira')).toBeInTheDocument();
    expect(getByText('Jon Jones')).toBeInTheDocument();
  });

  it('updates input fields when edit button is clicked', async () => {
    const { getByText, getByPlaceholderText } = component;

    fireEvent.click(getByText('Edit'));

    await waitFor(() => {
      expect(getByPlaceholderText('Enter first name')).toHaveValue('Jon');
      expect(getByPlaceholderText('Enter last name')).toHaveValue('Jones');
      expect(getByPlaceholderText('Enter age')).toHaveValue('36');
      expect(getByPlaceholderText('Enter photo URL')).toHaveValue('https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-03/JONES_JON_L_BELT_03_04.png?itok=P6J6DQpm');
    });
  });

});
