import React from 'react';

const NewTaskForm = ({ addItem }) => {
  const [textInput, setTextInput] = React.useState('');
  const [min, setMin] = React.useState('');
  const [sec, setSec] = React.useState('');

  const onInputChange = (e) => {
    setTextInput(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (textInput !== '') {
      addItem(textInput, Number(min) * 60000 + Number(sec) * 1000);
      setTextInput('');
      setMin('');
      setSec('');
    }
  };

  const onChangeMin = (e) => {
    setMin(e.target.value);
  };

  const onChangeSec = (e) => {
    setSec(e.target.value);
  };

  return (
    <form onSubmit={onSubmit} className="new-todo-form">
      <input value={textInput} onChange={onInputChange} className="new-todo" placeholder="Task" autoFocus />
      <input
        onChange={onChangeMin}
        value={min}
        className="new-todo-form__timer"
        placeholder="Min"
        autoFocus
        pattern="[0-9]*"
        onInvalid={(e) => {
          e.target.setCustomValidity('Неверный формат данных');
        }}
        onInput={(e) => {
          e.target.setCustomValidity('');
        }}
      />
      <input
        onChange={onChangeSec}
        value={sec}
        className="new-todo-form__timer"
        placeholder="Sec"
        autoFocus
        pattern="[0-9]*"
        onInvalid={(e) => {
          e.target.setCustomValidity('Неверный формат данных');
        }}
        onInput={(e) => {
          e.target.setCustomValidity('');
        }}
      />
      <button style={{ display: 'none' }} type="submit"></button>
    </form>
  );
};

export default NewTaskForm;
