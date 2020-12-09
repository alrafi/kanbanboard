import React, { useState } from 'react';
import './Home.scss';
import logoProsa from '../../assets/img/logo-prosa.png';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import CardBox from '../CardBox/CardBox';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

Modal.setAppElement('#root');

const initialData = {
  tasks: {
    'task-1': {
      issue_id: 'task-1',
      title: 'Improve accuracy of voice-to-text model',
      assigne: 'Alex Havard',
      tags: 'Research',
      start_date: '12/5/2020',
      end_date: '12/7/2020',
    },
    'task-2': {
      issue_id: 'task-2',
      title: 'Create API to load user info from database',
      assigne: 'Benedic Sancho',
      tags: 'Backend',
      start_date: '12/5/2020',
      end_date: '12/7/2020',
    },
    'task-3': {
      issue_id: 'task-3',
      title: 'Two-factor authentication to make private',
      assigne: 'Charles Tom',
      tags: 'Design',
      start_date: '12/5/2020',
      end_date: '12/7/2020',
    },
    'task-4': {
      issue_id: 'task-4',
      title: 'Bugs fix on customer dashboard',
      assigne: 'Daniel Ortega',
      tags: 'Frontend',
      start_date: '12/5/2020',
      end_date: '12/7/2020',
    },
  },
  cards: {
    'card-1': {
      id: 'card-1',
      title: 'Backlog',
      taskIds: ['task-1', 'task-2', 'task-4'],
      color: '#FFBA08',
    },
    'card-2': {
      id: 'card-2',
      title: 'To Do',
      taskIds: ['task-3'],
      color: '#17C9FF',
    },
    'card-3': {
      id: 'card-3',
      title: 'Done',
      taskIds: [],
      color: '#14E668',
    },
  },
  cardOrder: ['card-1', 'card-2', 'card-3'],
};

const Home = () => {
  const [state, setState] = useState(initialData);
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [newTaskCardId, setNewTaskCardId] = useState('');
  const [assigne, setAssigne] = useState('');
  const [tags, setTags] = useState('');

  const onDragEnd = (result) => {
    const { draggableId, source, destination, type } = result;
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    if (type === 'card') {
      const newCardOrder = Array.from(state.cardOrder);
      newCardOrder.splice(source.index, 1);
      newCardOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...state,
        cardOrder: newCardOrder,
      };
      setState(newState);
      return;
    }

    if (type === 'task') {
      const start = state.cards[source.droppableId];
      const finish = state.cards[destination.droppableId];

      // move task on same card
      if (start === finish) {
        const card = state.cards[source.droppableId];

        // set new ordered
        const newTaskIds = Array.from(card.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newCard = {
          ...card,
          taskIds: newTaskIds,
        };

        const newState = {
          ...state,
          cards: {
            ...state.cards,
            [newCard.id]: newCard,
          },
        };
        setState(newState);
        return;
      }

      // move task to another card
      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      };

      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      };

      const newState = {
        ...state,
        cards: {
          ...state.cards,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      };
      setState(newState);
      return;
    }
  };

  const [isModalAddTaskOpen, setIsModalAddTaskOpen] = useState(false);

  const toggleModalAddTask = () => {
    setIsModalAddTaskOpen(!isModalAddTaskOpen);
  };

  const renderModalAddTask = () => {
    return (
      <Modal
        isOpen={isModalAddTaskOpen}
        onRequestClose={toggleModalAddTask}
        contentLabel="Add New Task"
        closeTimeoutMS={500}
      >
        <div className="header">
          <h2>New Task</h2>
        </div>
        <form onSubmit={addNewTask}>
          <div className="field">
            <h3>Title</h3>
            <input type="text" onChange={handleTitle} value={title} />
          </div>
          <div className="field">
            <h3>Tags</h3>
            <input type="text" onChange={handleTags} value={tags} />
          </div>
          <div className="field">
            <h3>Asignee</h3>
            <input type="text" onChange={handleAssigne} value={assigne} />
          </div>
          <div className="field">
            <h3>Start Date</h3>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div className="field">
            <h3>End Date</h3>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            />
          </div>
          <div className="button-container">
            <button
              className="cancel-btn"
              type="button"
              onClick={toggleModalAddTask}
            >
              Cancel
            </button>
            <button className="create-btn" type="submit">
              Create Task
            </button>
          </div>
        </form>
      </Modal>
    );
  };

  const handleAssigne = (e) => {
    setAssigne(e.target.value);
  };

  const handleTags = (e) => {
    setTags(e.target.value);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleOpenModal = (cardID) => {
    setNewTaskCardId(cardID);
    setIsModalAddTaskOpen(true);
  };

  const addNewTask = (e) => {
    e.preventDefault();
    if (title === '') return;

    const length = Object.keys(state.tasks).length;

    const _data = { ...state };
    const issue_id = `task-${length + 1}`;

    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

    _data.tasks[issue_id] = {
      issue_id,
      title,
      tags,
      assigne,
      start_date: startDate.toLocaleDateString(undefined, options),
      end_date: endDate.toLocaleDateString(undefined, options),
    };

    const _tasks = [..._data.cards[newTaskCardId].taskIds];

    _data.cards[newTaskCardId].taskIds = [..._tasks, issue_id];

    setIsModalAddTaskOpen(false);
    setTitle('');
    setAssigne('');
    setTags('');
  };

  return (
    <div className="layout-container">
      <div className="menu-container">
        <div className="name-container">
          <img src="https://randomuser.me/api/portraits/men/15.jpg" alt="" />
          <div className="name-wrapper">
            <p>Clinton Watson</p>
            <p>Product Manager</p>
          </div>
        </div>
      </div>

      <div className="main-container">
        {renderModalAddTask()}
        <header className="main-header">
          <div className="header-title">
            <img src={logoProsa} alt="" />
            <h1>Kanban Prosa</h1>
          </div>
        </header>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-cards" direction="horizontal" type="card">
            {(provided) => (
              <main
                className="main-section"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {state.cardOrder.map((cardId, index) => {
                  const card = state.cards[cardId];
                  const tasks = card.taskIds.map(
                    (taskId) => state.tasks[taskId]
                  );
                  return (
                    <CardBox
                      key={cardId}
                      card={card}
                      tasks={tasks}
                      index={index}
                      openModal={handleOpenModal}
                    ></CardBox>
                  );
                })}
                {provided.placeholder}
              </main>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Home;
