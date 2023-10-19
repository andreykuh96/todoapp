import React from 'react';

import PropTypes from 'prop-types';
import TasksFilter from '../TasksFilter/TasksFilter';

const Footer = ({ notCompletedTask, filterData, onChangeActiveFilter, deletedCompletedTask }) => {
  const elements = filterData.map((el) => {
    const { id, ...filterProps } = el;

    return (
      <li key={id}>
        <TasksFilter onChangeActiveFilter={() => onChangeActiveFilter(id)} {...filterProps} />
      </li>
    );
  });

  return (
    <footer className="footer">
      <span className="todo-count">{notCompletedTask} items left</span>
      <ul className="filters">{elements}</ul>
      <button onClick={deletedCompletedTask} className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  notCompletedTask: 0,
  onChangeActiveFilter: () => {
    return alert('To add a new task, pass the function');
  },
  deletedCompletedTask: () => {
    return alert('To add a new task, pass the function');
  },
};

Footer.propTypes = {
  notCompletedTask: PropTypes.number,
  filterData: PropTypes.arrayOf(PropTypes.object),
  onChangeActiveFilter: PropTypes.func,
  deletedCompletedTask: PropTypes.func,
};

export default Footer;
