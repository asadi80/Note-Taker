const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));
const { tasks } = require('./db/notes');

const PORT = process.env.PORT || 3000;


function filterByQuery(query, tasksArray) {
    let filteredResults = tasksArray;
    if (query.title) {
      filteredResults = filteredResults.filter(tasks => tasks.title === query.title);
    }
    
    return filteredResults;
}

function createNewTask(body, tasksArray) {
    console.log(body);
    const task = body;
    tasksArray.push(task);
    fs.writeFileSync(
        path.join(__dirname, './db/notes.json'),
        JSON.stringify({ tasks: tasksArray }, null, 2)
      );
  
    return task;
  }

function validateTask(task) {
    if (!task.title || typeof task.title !== 'string') {
        return false;
    }
    if (!task.text || typeof task.text !== 'string') {
        return false;
    }

    return true;
}

function findById(id, tasksArray) {
    const result = tasksArray.filter(task => task.id === id)[0];
    return result;
}

app.get('/api/notes', (req, res) => {
    let results = tasks;
    if (req.query) {
        results = filterByQuery(req.query, results);
      }
    res.json(results);
    
});
app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, tasks);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});
app.post('/api/notes', (req, res) => {
    console.log(req.body);
    // set id based on what the next index of the array will be
    req.body.id = tasks.length.toString();

     // if any data in req.body is incorrect, send 400 error back
  if (!validateTask(req.body)) {
    res.status(400).send('The task is not properly formatted.');
  } else {
     // add task to json file and tasks array in this function
    const task = createNewTask(req.body, tasks);
    res.json(req.body);
  }
});

app.delete('/api/notes/:id', (req, res) => {

  const { id } = req.params;
  const projectIndex = tasks.findIndex(p => p.id == id);
  tasks.splice(projectIndex, 1);
  fs.writeFileSync(
    path.join(__dirname, './db/notes.json'),
    JSON.stringify({ tasks}, null, 2)
  );
  return res.send();
  
    
    
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

app.get('/notes', (req, res) => {
res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });




app.listen(PORT, () => {
console.log(`API server now on port ${PORT}!`);
});