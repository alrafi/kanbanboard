import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './TaskItem.scss';

const TaskItem = ({ task, index }) => {
  const getFirstLetter = (name) => {
    return name.substring(0, 1);
  };

  const countDays = (startDate, endDate) => {
    const oneDay = 24 * 60 * 60 * 1000;

    const _startDate = startDate.split('/');
    const _endDate = endDate.split('/');

    const firstDate = new Date(_startDate[2], _startDate[0], _startDate[1]);
    const secondDate = new Date(_endDate[2], _endDate[0], _endDate[1]);

    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

    return diffDays;
  };

  return (
    <Draggable draggableId={task.issue_id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="task-item-container"
        >
          <h3>{task.title}</h3>
          <div className="info-wrapper">
            <div className="assigne-tags">
              {task.assigne && (
                <div className="task-assigne">
                  {getFirstLetter(task.assigne)}
                </div>
              )}
              {task.tags && <div className="task-tag">{task.tags}</div>}
            </div>
            <div className="task-days">
              {countDays(task.start_date, task.end_date)} days
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskItem;
