import React, { useState } from 'react';

import TaskList from '../TaskList/TaskList';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import Footer from '../Footer/Footer';

const App = () => {
  const [activeFilter, setActiveFilter] = useState(1);
  const [taskData, setTaskData] = useState([
    {
      description: 'Learn HTML',
      created: Date.now(),
      id: 1,
      completed: false,
      editing: false,
    },
    {
      description: 'Learn CSS',
      created: Date.now(),
      id: 2,
      completed: false,
      editing: false,
    },
    {
      description: 'Learn JS',
      created: Date.now(),
      id: 3,
      completed: false,
      editing: false,
    },
  ]);
  const [filterData, setFilterData] = useState([
    { text: 'All', id: 1, active: true },
    { text: 'Active', id: 2, active: false },
    { text: 'Completed', id: 3, active: false },
  ]);

  const onChangeActiveFilter = (id) => {
    setFilterData((prev) => {
      return prev.map((el) => ({
        ...el,
        active: el.id === id,
      }));
    });
    setActiveFilter(id);
  };

  const onChangeActiveTask = (id) => {
    setTaskData((prev) => {
      const idx = prev.findIndex((el) => el.id === id);
      const oldItem = prev[idx];
      const newItem = { ...oldItem, completed: !oldItem.completed };
      return [...prev.slice(0, idx), newItem, ...prev.slice(idx + 1)];
    });
  };

  const onChangeEditing = (id) => {
    setTaskData((prev) => {
      const idx = prev.findIndex((el) => el.id === id);
      const oldItem = prev[idx];
      const newItem = { ...oldItem, editing: !oldItem.editing };
      return [...prev.slice(0, idx), newItem, ...prev.slice(idx + 1)];
    });
  };

  const addItem = (text) => {
    const newItem = {
      description: text,
      created: Date.now(),
      id: Date.now(),
      completed: false,
      editing: false,
    };

    setTaskData((prev) => {
      return [newItem, ...prev];
    });
  };

  const editingTask = (id, text) => {
    setTaskData((prev) => {
      const idx = prev.findIndex((el) => el.id === id);
      const oldItem = prev[idx];
      const newItem = { ...oldItem, description: text, editing: false };
      return [...prev.slice(0, idx), newItem, ...prev.slice(idx + 1)];
    });
  };

  const onDeleteTask = (id) => {
    setTaskData((prev) => {
      const idx = prev.findIndex((el) => el.id === id);
      return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
    });
  };

  const deletedCompletedTask = () => {
    setTaskData((prev) => {
      return prev.filter((item) => item.completed === false);
    });
  };

  const notCompletedTask = taskData.filter((el) => !el.completed).length;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm addItem={addItem} />
      </header>
      <section className="main">
        <TaskList
          onChangeEditing={onChangeEditing}
          editingTask={editingTask}
          activeFilter={activeFilter}
          onDeleteTask={onDeleteTask}
          onChangeActiveTask={onChangeActiveTask}
          taskData={taskData}
        />
        <Footer
          deletedCompletedTask={deletedCompletedTask}
          onChangeActiveFilter={onChangeActiveFilter}
          filterData={filterData}
          notCompletedTask={notCompletedTask}
        />
      </section>
    </section>
  );
};

export default App;
