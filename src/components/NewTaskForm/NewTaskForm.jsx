import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({ addItem }) => {
  const [textInput, setTextInput] = useState('');

  const onInputChange = (e) => {
    setTextInput(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (textInput !== '') {
      addItem(textInput);
      setTextInput('');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        onChange={onInputChange}
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={textInput}
      />
    </form>
  );
};

NewTaskForm.defaultProps = {
  addItem: () => {
    return alert('To add a new task, pass the function');
  },
};

NewTaskForm.propTypes = {
  addItem: PropTypes.func,
};

export default NewTaskForm;
