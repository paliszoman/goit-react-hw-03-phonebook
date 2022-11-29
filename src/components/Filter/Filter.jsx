import css from './Filter.module.css';
import React, { Component } from "react";
import PropTypes from 'prop-types';

export class Filter extends Component {

    static propTypes = {
        formSubmit: PropTypes.func,
        contact: PropTypes.objectOf(PropTypes.string)
    }
    
    formSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget.elements;
        const contact = form.name.value;

    this.props.onChange({ contact });
    }

    render(){
    return(
        <form className={css.form} onChange={this.formSubmit}>
            <label className={css.label}>Find contacts by name</label>
            <input className={css.input}
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required />
        </form>
    )}
}