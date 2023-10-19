import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  state = {
    textInput: '',
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
      this.props.addItem(this.state.textInput);
      this.setState({
        textInput: '',
      });
    }
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          onChange={this.onInputChange}
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={this.state.textInput}
        />
      </form>
    );
  }
}
