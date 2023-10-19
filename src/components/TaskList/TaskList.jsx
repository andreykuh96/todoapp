import React from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task';

const TaskList = ({ taskData, onChangeActiveTask, onDeleteTask, activeFilter, editingTask, onChangeEditing }) => {
  const filterTasks = taskData.filter((item) => {
    if (activeFilter === 1) return true;
    if (activeFilter === 2) return !item.completed;
    if (activeFilter === 3) return item.completed;
    return true;
  });

  const element = filterTasks.map((el) => {
    const { id, completed, editing, ...taskProps } = el;
    let classNames = null;

    if (completed) {
      classNames = 'completed';
    }

    if (editing) {
      classNames = 'editing';
    }

    return (
      <li key={id} className={classNames}>
        <Task
          id={id}
          editingTask={editingTask}
          onDeleteTask={() => onDeleteTask(id)}
          onChangeActiveTask={() => onChangeActiveTask(id)}
          onChangeEditing={() => onChangeEditing(id)}
          taskProps={taskProps}
        />
      </li>
    );
  });

  return <ul className="todo-list">{element}</ul>;
};

TaskList.defaultProps = {
  onChangeActiveTask: () => {
    return alert('To add a new task, pass the function');
  },
  onDeleteTask: () => {
    return alert('To add a new task, pass the function');
  },
  activeFilter: 1,
};

TaskList.propTypes = {
  taskData: PropTypes.arrayOf(PropTypes.object),
  onChangeActiveTask: PropTypes.func,
  onDeleteTask: PropTypes.func,
  activeFilter: PropTypes.number,
  editingTask: PropTypes.func,
  onChangeEditing: PropTypes.func,
};

export default TaskList;
