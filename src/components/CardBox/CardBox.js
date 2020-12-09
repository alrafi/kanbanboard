import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import './CardBox.scss';
import TaskItem from '../TaskItem/TaskItem';

const CardBox = ({ card, tasks, index, openModal }) => {
  return (
    <>
      <Draggable draggableId={card.id} index={index}>
        {(provided) => (
          <Droppable droppableId={card.id} type="task">
            {(provided2, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.dragHandleProps}
                {...provided.draggableProps}
                className="card-box"
              >
                <div className="card-header-container">
                  <h1 className="card-title">{card.title}</h1>
                  <button onClick={() => openModal(card.id)}>+ Add Task</button>
                </div>
                <div
                  ref={provided2.innerRef}
                  {...provided2.droppableProps}
                  className="task-container"
                >
                  {tasks.map((task, index) => (
                    <TaskItem key={task.issue_id} task={task} index={index} />
                  ))}
                  {provided2.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        )}
      </Draggable>
    </>
  );
};

export default CardBox;
