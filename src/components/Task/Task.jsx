import { formatDistanceToNow } from 'date-fns';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Task extends Component {
  static defaultProps = {
    onChangeActiveTask: () => {
      return alert('To add a new task, pass the function');
    },
    onDeleteTask: () => {
      return alert('To add a new task, pass the function');
    },
  };

  static propTypes = {
    taskProps: PropTypes.object,
    onChangeActiveTask: PropTypes.func,
    onDeleteTask: PropTypes.func,
    editingTask: PropTypes.func,
    id: PropTypes.number,
    onChangeEditing: PropTypes.func,
  };

  state = {
    value: this.props.taskProps.description,
  };

  onInputChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.editingTask(this.props.id, this.state.value);
  };

  render() {
    const { taskProps, onChangeActiveTask, onDeleteTask, onChangeEditing } = this.props;
    const { description, created } = taskProps;

    return (
      <>
        <div className="view">
          <input onClick={onChangeActiveTask} className="toggle" type="checkbox" />
          <label>
            <span className="description">{description}</span>
            <span className="created">{formatDistanceToNow(created, { includeSeconds: true })}</span>
          </label>
          <button onClick={onChangeEditing} className="icon icon-edit"></button>
          <button onClick={onDeleteTask} className="icon icon-destroy"></button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input type="text" className="edit" onChange={this.onInputChange} value={this.state.value} />
        </form>
      </>
    );
  }
}
