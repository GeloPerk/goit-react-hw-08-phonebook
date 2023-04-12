import { Route, Routes } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Container, Title, ContactList } from './App.styled';
import { Contacts } from './Contacts/Contacts';
import { ContactsForm } from './ContactsForm/ContactsForm';
import { Filter } from './Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectContacts,
  addContact,
  deleteContact,
  setFilter,
  fetchContacts,
} from './contactsSlice/contactsSlice';
import  Registration  from './auth/register/registration';
import { Login } from './auth/login/login';
import { UserSettings} from './auth/userset/usersettings';
import usersSlice from './auth/slice/usersSlice';

function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector((state) => state.contacts.filter);
  const loggedIn = useSelector((state) => state.contacts.filter );

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddNewContact = (newContact) => {
    dispatch(addContact(newContact));
  };

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  const handleFilterChange = (event) => {
    dispatch(setFilter(event.currentTarget.value));
  };

  const filterContacts = () =>
    contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

  return (
    <>
      <Container>
        <Title>Phonebook</Title>
        {!loggedIn && (
          <>
            <Routes>
              <Route path="/register">
                <Registration />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
            </Routes>
          </>
        )}
        {loggedIn && (
          <>
            <ContactsForm addNewContact={handleAddNewContact} />
            <UserSettings />
          </>
        )}
      </Container>
      <Container>
        {loggedIn && (
          <>
            <Title>Contacts</Title>
            <Filter findByFilter={handleFilterChange} value={filter} />
            <ContactList>
              <Contacts
                contacts={filterContacts()}
                deleteContact={handleDeleteContact}
              />
            </ContactList>
          </>
        )}
      </Container>
    </>
  );
}

export default App;