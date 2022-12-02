import React, { Component } from 'react';

import { Form } from './Form/Form.jsx';
import { Filter } from './Filter/Filter.jsx';
import { ContactList } from './ContactList/ContactList.jsx';

export class App extends Component {
  static defaultProps = {
    contacts: [],
    filter: '',
  };

  constructor(props) {
    super(props);
    this.searchForContacts = this.searchForContacts.bind(this);
    this.searchForExistingContacts = this.searchForExistingContacts.bind(this);
    this.deleteContacts = this.deleteContacts.bind(this);
  }

  componentDidMount() {
    if (this.state.contacts.length <= 0) {
      this.setState({
        contacts: JSON.parse(localStorage.getItem('phonebook')),
      });
    }
  }

  componentDidUpdate() {
    if (this.state !== localStorage.getItem('phonebook')) {
      localStorage.setItem('phonebook', JSON.stringify(this.state.contacts));
    }
  }

  //function for searching contacts by single letter
  searchForContacts(search) {
    const contacts = this.state.contacts;
    const filter = search.contact.toLowerCase();
    let filterArray = [];
    contacts.map(contact => {
      const hasName = contact.name.toLowerCase().includes(filter);
      if (hasName) {
        filterArray.push(contact);
      }
      return this.setState({ filter: filterArray });
    });
  }

  //function looking for contact if exist make alert
  searchForExistingContacts(contactFromForm) {
    const contacts = this.state.contacts;
    const filter = contactFromForm.name.toLowerCase();
    let contactsArray = contacts.find(
      contact => contact.name.toLocaleLowerCase() === filter
    );

    return contactsArray === undefined
      ? this.setState({ contacts: [...this.state.contacts, contactFromForm] })
      : alert('We have contact like this!');
  }

  //function that delete object with name from state

  deleteContacts(deleteContact) {
    const contacts = this.state.contacts;
    let contactsArray = [...contacts];
    let searchedContact = contacts.findIndex(
      contact => contact.name === deleteContact
    );
    contactsArray.splice(searchedContact, 1);
    return this.setState({ contacts: contactsArray });
  }

  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: [],
  };

  render() {
    return (
      <>
        <h1>Phonebook</h1>
        <Form onSubmit={value => this.searchForExistingContacts(value)}></Form>
        <h2>Contacts</h2>
        <Filter onChange={search => this.searchForContacts(search)}></Filter>
        <ContactList
          contacts={
            this.state.filter[0] == null
              ? this.state.contacts
              : this.state.filter
          }
          deleteMe={this.deleteContacts}
        />
      </>
    );
  }
}
