import css from './ContactList.module.css';
import PropTypes from 'prop-types';

export const ContactList = ({ contacts, deleteMe }) => {
  return contacts.length > 0 ? (
    <ul className={css.contactList}>
      {contacts.map(contact => (
        <li key={contact.id} className={css.contact}>
          {contact.name}: {contact.number}{' '}
          <button
            type="submit"
            onClick={() => {
              deleteMe(contact.name);
            }}
          >
            x
          </button>
        </li>
      ))}
    </ul>
  ) : (
    <div className={css.contactList}>We don't have any contact yet!</div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  deleteMe: PropTypes.func,
};
