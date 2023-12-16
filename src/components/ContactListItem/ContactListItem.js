import { ContactsText, DeleteBtn } from './ContactListItem.styled';

export const ContactListItem = ({ contact, ondeleteContact }) => {
  return (
    <>
      <ContactsText>{contact.name}</ContactsText>
      <ContactsText>{contact.number}</ContactsText>
      <DeleteBtn onClick={() => ondeleteContact(contact.id)}>Delete</DeleteBtn>
    </>
  );
};
