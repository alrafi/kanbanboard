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
      taskIds: ['task-1', 'task-2'],
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
      taskIds: ['task-4'],
      color: '#14E668',
    },
  },
  cardSlot: ['card-1', 'card-2', 'card-3'],
};

export default initialData;
