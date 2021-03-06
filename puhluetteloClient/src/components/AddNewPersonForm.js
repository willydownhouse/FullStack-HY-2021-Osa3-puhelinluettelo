import React from 'react';

import phoneService from '../services/PhoneNumbers';

const AddNewPersonForm = props => {
  const {
    phoneBook,
    setPhoneBook,
    newName,
    setNewName,
    phoneNumber,
    setPhoneNumber,
    setErrorMessage,
    setSuccessMessage,
  } = props;

  const onFormSubmit = e => {
    e.preventDefault();

    if (!phoneBook.map(person => person.name).includes(newName)) {
      phoneService
        .create({ name: newName, number: phoneNumber })
        .then(newPhoneNumber => {
          setPhoneBook(phoneBook.concat(newPhoneNumber.data));
          setSuccessMessage('New number created succesfully!');

          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        })
        .catch(err => {
          console.log(err.response.data);
          if (err.response.data.message) {
            setErrorMessage(err.response.data.message);
          } else {
            setErrorMessage(
              `Couldnt add ${newName} to the phonebook, please try again!`
            );
          }

          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
      setNewName('');
      setPhoneNumber('');
      return;
    }

    if (
      window.confirm(
        `${newName} is already in the phonebook, do you want to replace the old number with the new one`
      )
    ) {
      const currentObj = phoneBook.find(ob => ob.name === newName);

      phoneService
        .update(currentObj._id, {
          name: newName,
          number: phoneNumber,
        })
        .then(updatedObj => {
          setPhoneBook(
            phoneBook.map(ob =>
              ob._id !== updatedObj.data._id ? ob : updatedObj.data
            )
          );

          setSuccessMessage('Number updated succesfully!');

          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        })
        .catch(err => {
          console.log(err.response.data);
          if (err.response.data.message) {
            setErrorMessage(err.response.data.message);
          } else {
            setErrorMessage(
              `Couldnt update ${newName}s number, please try again!`
            );
          }

          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });

      setNewName('');
      setPhoneNumber('');
    }
  };

  return (
    <>
      <form className="ui form" onSubmit={onFormSubmit}>
        <div className="field">
          <label>Name</label>
          <input
            id="nimi"
            value={newName}
            onChange={e => setNewName(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Phonenumber</label>
          <input
            id="number"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <button id="add" className="ui button secondary" type="submit">
            Add
          </button>
        </div>
      </form>
      <div className="ui hidden divider"></div>
    </>
  );
};

export default AddNewPersonForm;
