import { formatDistanceToNow } from 'date-fns';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Task = ({ taskProps, onChangeActiveTask, onDeleteTask, onChangeEditing, editingTask, id }) => {
  const [value, setValue] = useState(taskProps.description);
  const { description, created } = taskProps;

  const onInputChange = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    editingTask(id, value);
  };

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
      <form onSubmit={onSubmit}>
        <input type="text" className="edit" onChange={onInputChange} value={value} />
      </form>
    </>
  );
};

Task.defaultProps = {
  onChangeActiveTask: () => {
    return alert('To add a new task, pass the function');
  },
  onDeleteTask: () => {
    return alert('To add a new task, pass the function');
  },
};

Task.propTypes = {
  taskProps: PropTypes.object,
  onChangeActiveTask: PropTypes.func,
  onDeleteTask: PropTypes.func,
  editingTask: PropTypes.func,
  id: PropTypes.number,
  onChangeEditing: PropTypes.func,
};

export default Task;
