import React, { useState } from 'react';
import './Home.scss';
import logoProsa from '../../assets/img/logo-prosa.png';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from '../../data/intialData';
import CardBox from '../CardBox/CardBox';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

Modal.setAppElement('#root');

const Home = () => {
  const _data = localStorage.getItem('dataKanban')
    ? JSON.parse(localStorage.getItem('dataKanban'))
    : initialData;
  const [data, setData] = useState(_data);
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [newTaskCardId, setNewTaskCardId] = useState('');
  const [assigne, setAssigne] = useState('');
  const [tags, setTags] = useState('');
  const [isModalAddTaskOpen, setIsModalAddTaskOpen] = useState(false);

  const onDragEnd = (res) => {
    const { draggableId, source, destination, type } = res;
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    if (type === 'task') {
      const sourceData = data.cards[source.droppableId];
      const destData = data.cards[destination.droppableId];

      // move task on same card
      if (sourceData === destData) {
        const card = data.cards[source.droppableId];

        // set new ordered
        const newTaskIds = Array.from(card.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newCard = {
          ...card,
          taskIds: newTaskIds,
        };

        const newData = {
          ...data,
          cards: {
            ...data.cards,
            [newCard.id]: newCard,
          },
        };
        setData(newData);
        localStorage.setItem('dataKanban', JSON.stringify(newData));
        return;
      }

      // move task to another card
      const startTaskIds = Array.from(sourceData.taskIds);
      startTaskIds.splice(source.index, 1);
      const newSource = {
        ...sourceData,
        taskIds: startTaskIds,
      };

      const finishTaskIds = Array.from(destData.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newDest = {
        ...destData,
        taskIds: finishTaskIds,
      };

      const newData = {
        ...data,
        cards: {
          ...data.cards,
          [newSource.id]: newSource,
          [newDest.id]: newDest,
        },
      };
      setData(newData);
      localStorage.setItem('dataKanban', JSON.stringify(newData));
      return;
    }
  };

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

    const length = Object.keys(data.tasks).length;

    const _data = { ...data };
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

    // save data local storage
    localStorage.setItem('dataKanban', JSON.stringify(_data));

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
        <div className="task-count-container">
          <h2>Your Tasks</h2>
          <p>{data.cards['card-1'].taskIds.length} Open Tasks</p>
          <p>{data.cards['card-2'].taskIds.length} To Do Tasks</p>
          <p>{data.cards['card-3'].taskIds.length} Completed Tasks</p>
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
          <main className="main-section">
            {data.cardSlot.map((cardId, index) => {
              const card = data.cards[cardId];
              const tasks = card.taskIds.map((taskId) => data.tasks[taskId]);
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
          </main>
        </DragDropContext>

        <footer>
          <h3>Made with ❤️ by hafisalrafi</h3>
        </footer>
      </div>
    </div>
  );
};

export default Home;
