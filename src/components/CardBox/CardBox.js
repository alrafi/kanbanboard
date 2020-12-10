import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import './CardBox.scss';
import TaskItem from '../TaskItem/TaskItem';

const CardBox = ({ card, tasks, index, openModal }) => {
  return (
    <>
      <Droppable droppableId={card.id} type="task">
        {(provided) => (
          <div className="card-box">
            <div className="card-header-container">
              <h1 className="card-title">{card.title}</h1>
              <button onClick={() => openModal(card.id)}>+ Add Task</button>
            </div>
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="task-container"
            >
              {tasks.map((task, index) => (
                <TaskItem key={task.issue_id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </>
  );
};

export default CardBox;
