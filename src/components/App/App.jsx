import React from 'react';

import TaskList from '../TaskList/TaskList';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import Footer from '../Footer/Footer';

const App = () => {
  const [activeFilter, setActiveFilter] = React.useState(1);
  const [taskData, setTaskData] = React.useState([
    {
      description: 'Learn HTML',
      created: Date.now(),
      id: 1,
      completed: false,
      editing: false,
      time: 10000,
      isRunning: true,
    },
    {
      description: 'Learn CSS',
      created: Date.now(),
      id: 2,
      completed: false,
      editing: false,
      time: 20000,
      isRunning: true,
    },
  ]);
  const [filterData, setFilterData] = React.useState([
    { text: 'All', id: 1, active: true },
    { text: 'Active', id: 2, active: false },
    { text: 'Completed', id: 3, active: false },
  ]);

  const tick = (taskId) => {
    setTaskData((prev) =>
      prev.map((task) =>
        task.id === taskId && task.time > 0 && task.isRunning ? { ...task, time: task.time - 1000 } : task
      )
    );
  };

  const onStopTimer = (taskId) => {
    setTaskData((prev) => prev.map((task) => (task.id === taskId ? { ...task, isRunning: false } : task)));
  };

  const onStartTimer = (taskId) => {
    setTaskData((prev) => prev.map((task) => (task.id === taskId ? { ...task, isRunning: true } : task)));
  };

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

  const addItem = (text, time) => {
    const newItem = {
      description: text,
      created: Date.now(),
      id: Date.now(),
      completed: false,
      editing: false,
      time: time,
      isRunning: true,
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
          onStopTimer={onStopTimer}
          onStartTimer={onStartTimer}
          tick={tick}
          activeFilter={activeFilter}
          onChangeEditing={onChangeEditing}
          editingTask={editingTask}
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
