import React from 'react';
import PropTypes from 'prop-types';

const TasksFilter = ({ text, active, onChangeActiveFilter }) => {
  return (
    <button onClick={onChangeActiveFilter} className={active ? 'selected' : ''}>
      {text}
    </button>
  );
};

TasksFilter.propTypes = {
  text: PropTypes.string,
  active: PropTypes.bool,
  onChangeActiveFilter: PropTypes.func,
};

export default TasksFilter;
