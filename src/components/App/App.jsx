import React, { Component } from 'react';

import TaskList from '../TaskList/TaskList';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import Footer from '../Footer/Footer';

export default class App extends Component {
  state = {
    activeFilter: 1,
    taskData: [
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
    ],
    filterData: [
      { text: 'All', id: 1, active: true },
      { text: 'Active', id: 2, active: false },
      { text: 'Completed', id: 3, active: false },
    ],
  };

  tick = (taskId) => {
    this.setState((prevState) => ({
      taskData: prevState.taskData.map((task) =>
        task.id === taskId && task.time > 0 && task.isRunning ? { ...task, time: task.time - 1000 } : task
      ),
    }));
  };

  onStopTimer = (taskId) => {
    this.setState((prevState) => ({
      taskData: prevState.taskData.map((task) => (task.id === taskId ? { ...task, isRunning: false } : task)),
    }));
  };

  onStartTimer = (taskId) => {
    this.setState((prevState) => ({
      taskData: prevState.taskData.map((task) => (task.id === taskId ? { ...task, isRunning: true } : task)),
    }));
  };

  onChangeActiveFilter = (id) => {
    this.setState((prevFilterData) => {
      return {
        ...prevFilterData,
        filterData: prevFilterData.filterData.filter((item) => {
          return {
            ...item,
            active: item.id === id ? (item.active = true) : (item.active = false),
          };
        }),
      };
    });
    this.setState({
      activeFilter: id,
    });
  };

  onChangeActiveTask = (id) => {
    this.setState(({ taskData }) => {
      const idx = taskData.findIndex((el) => el.id === id);
      const oldItem = taskData[idx];
      const newItem = { ...oldItem, completed: !oldItem.completed };
      const newData = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)];

      return {
        taskData: newData,
      };
    });
  };

  onChangeEditing = (id) => {
    this.setState(({ taskData }) => {
      const idx = taskData.findIndex((el) => el.id === id);
      const oldItem = taskData[idx];
      const newItem = { ...oldItem, editing: !oldItem.editing };
      const newData = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)];

      return {
        taskData: newData,
      };
    });
  };

  addItem = (text, time) => {
    const newItem = {
      description: text,
      created: Date.now(),
      id: Date.now(),
      completed: false,
      editing: false,
      time: time,
      isRunning: true,
    };

    this.setState(({ taskData }) => {
      const newData = [newItem, ...taskData];

      return {
        taskData: newData,
      };
    });
  };

  editingTask = (id, text) => {
    this.setState(({ taskData }) => {
      const idx = taskData.findIndex((el) => el.id === id);
      const oldItem = taskData[idx];
      const newItem = { ...oldItem, description: text, editing: false };
      const newData = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)];

      return {
        taskData: newData,
      };
    });
  };

  onDeleteTask = (id) => {
    this.setState(({ taskData }) => {
      const idx = taskData.findIndex((el) => el.id === id);
      const newData = [...taskData.slice(0, idx), ...taskData.slice(idx + 1)];

      return {
        taskData: newData,
      };
    });
  };

  deletedCompletedTask = () => {
    this.setState(({ taskData }) => {
      const newData = taskData.filter((item) => item.completed === false);
      return {
        taskData: newData,
      };
    });
  };

  render() {
    const { taskData, filterData, activeFilter } = this.state;

    const notCompletedTask = taskData.filter((el) => !el.completed).length;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm addItem={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            onStopTimer={this.onStopTimer}
            onStartTimer={this.onStartTimer}
            tick={this.tick}
            activeFilter={activeFilter}
            onChangeEditing={this.onChangeEditing}
            editingTask={this.editingTask}
            onDeleteTask={this.onDeleteTask}
            onChangeActiveTask={this.onChangeActiveTask}
            taskData={taskData}
          />
          <Footer
            deletedCompletedTask={this.deletedCompletedTask}
            onChangeActiveFilter={this.onChangeActiveFilter}
            filterData={filterData}
            notCompletedTask={notCompletedTask}
          />
        </section>
      </section>
    );
  }
}
