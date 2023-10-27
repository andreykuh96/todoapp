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

  componentDidMount() {
    this.timerID = setInterval(() => this.props.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

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
    const { description, created, time } = taskProps;
    const minutes = Math.floor(time / 1000 / 60);
    const seconds = (time / 1000) % 60;
    return (
      <>
        <div className="view">
          <input onClick={onChangeActiveTask} className="toggle" type="checkbox" />
          <label>
            <span className="title">{description}</span>
            <span className="description">
              <button onClick={this.props.onStartTimer} className="icon icon-play"></button>
              <button onClick={this.props.onStopTimer} className="icon icon-pause"></button>
              {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </span>
            <span className="description">{formatDistanceToNow(created, { includeSeconds: true })}</span>
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
