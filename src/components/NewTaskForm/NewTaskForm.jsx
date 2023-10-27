import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  state = {
    textInput: '',
    min: '',
    sec: '',
  };

  static defaultProps = {
    addItem: () => {
      return alert('To add a new task, pass the function');
    },
  };

  static propTypes = {
    addItem: PropTypes.func,
  };

  onInputChange = (e) => {
    this.setState({
      textInput: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (this.state.textInput !== '') {
      this.props.addItem(this.state.textInput, +this.state.min * 60000 + +this.state.sec * 1000);
      this.setState({
        textInput: '',
        min: '',
        sec: '',
      });
    }
  };

  onChangeMin = (e) => {
    this.setState({
      min: e.target.value,
    });
  };

  onChangeSec = (e) => {
    this.setState({
      sec: e.target.value,
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className="new-todo-form">
        <input
          value={this.state.textInput}
          onChange={this.onInputChange}
          className="new-todo"
          placeholder="Task"
          autoFocus
        />
        <input
          onChange={this.onChangeMin}
          value={this.state.min}
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
          onChange={this.onChangeSec}
          value={this.state.sec}
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
  }
}
