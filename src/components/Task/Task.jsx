import { formatDistanceToNow } from 'date-fns';
import React from 'react';

const Task = ({
  taskProps,
  tick,
  editingTask,
  id,
  onChangeActiveTask,
  onDeleteTask,
  onChangeEditing,
  onStartTimer,
  onStopTimer,
}) => {
  const [value, setValue] = React.useState(taskProps.description);

  React.useEffect(() => {
    let timerID = setInterval(() => tick(), 1000);
    return () => {
      clearInterval(timerID);
    };
  }, []);

  const onInputChange = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    editingTask(id, value);
  };

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
            <button onClick={onStartTimer} className="icon icon-play"></button>
            <button onClick={onStopTimer} className="icon icon-pause"></button>
            {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </span>
          <span className="description">{formatDistanceToNow(created, { includeSeconds: true })}</span>
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

export default Task;
