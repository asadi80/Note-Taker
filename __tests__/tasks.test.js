const fs = require('fs');
const { filterByQuery, findById, createNewTask,validateTask } = require('../lib/taskValidatore.js');
const { tasks } = require('../db/notes');

// it works but i will keep posting task in the json file when you test it
// test('creates an task object', () => {
//   const task = createNewTask({ title: 'work',text: 'work 12:00'}, tasks);

//   expect(task.title).toBe('work');
//   expect(task.text).toBe('work 12:00');
// });

test('filters by query', () => {
  const task = [
    {
     
      title: 'GYM',
      text: '6:30 I have to be at the GYM',
      
    }
    
  ];

  const result = filterByQuery({ title: 'GYM' }, task);

  expect(task.length).toEqual(1);
});

test('finds by id', () => {
  const task = [
    {
      id: '0',
      title: 'GYM',
      text: '6:30 I have to be at the GYM',
    }
    
  ];

  const result = findById('0', task);

  expect(result.id).toBe('0');
});

test('validate task', () => {
  const task = 
    {

      title: 'work',
      text: '8:30 I have to be at work',
    }
    
  ;
  const result = validateTask(task);
  expect(result).toBe(true);
 
});

