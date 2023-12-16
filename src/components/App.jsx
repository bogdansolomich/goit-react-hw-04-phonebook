import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { ContactFilter } from './ContactFilter/ContactFilter';
import { StyledSection, SectionTitle, ContactsTitle } from './Section.styled';
import { GlobalStyle } from './Globalstyle';
import { Container } from './Container';
import { StyledNotification } from './Notification.styled';

const LS_KEY = 'contacts';

// Отримуємо контакти з LS
const getInitialContacts = () => {
  const savedContacts = localStorage.getItem(LS_KEY);

  if (savedContacts) {
    return JSON.parse(savedContacts);
  }
  return [];
};

export const App = () => {
  const [contacts, setContacts] = useState(getInitialContacts);
  const [filter, setFilter] = useState('');

  // Записуємо контакти в LS
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  // Додаємо контакт до списку / перевіряємо чи такий контакт вже є у списку
  const addContact = newContact => {
    const isContactInList = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isContactInList) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }

    setContacts(prevContacts => [
      ...prevContacts,
      { id: nanoid(), ...newContact },
    ]);
  };

  // Видаляємо контакт зі списку
  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  // Отримуємо значення інпута в стейті
  const filterContactsByName = newContactName => {
    setFilter(newContactName);
  };

  // Перевіряємо, чи містить масив контактів значення з інпута; якщо так - повертаємо новий масив з цим значенням
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <StyledSection>
        <Container>
          <SectionTitle>Phonebook</SectionTitle>
          <ContactForm onAdd={addContact} />
        </Container>
      </StyledSection>

      <StyledSection>
        <Container>
          <ContactsTitle>Contacts</ContactsTitle>
          <ContactFilter
            filter={filter}
            onfilterContactsByName={filterContactsByName}
          />
          {contacts.length > 0 && filteredContacts.length > 0 ? (
            <ContactList
              contacts={filteredContacts}
              ondeleteContact={deleteContact}
            />
          ) : (
            <StyledNotification>
              There are no contacts to show! Please add some contacts to the
              phonebook or check your search query
            </StyledNotification>
          )}
        </Container>
      </StyledSection>
      <GlobalStyle />
    </>
  );
};
