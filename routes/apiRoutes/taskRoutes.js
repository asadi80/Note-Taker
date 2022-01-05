const fs = require('fs');
const path = require('path');

const router = require('express').Router();
const { filterByQuery, 
    findById, 
    createNewTask, 
    validateTask } = require('../../lib/taskValidatore');
const { tasks } = require('../../db/notes');

router.get('/notes', (req, res) => {
    let results = tasks;
    if (req.query) {
        results = filterByQuery(req.query, results);
      }
    res.json(results);
    
});
//   ger req by id
router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, tasks);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});
  // posting req
router.post('/notes', (req, res) => {
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

  // deleting req
router.delete('/notes/:id', (req, res) => {

  const { id } = req.params;
  const deletedTask = tasks.findIndex(p => p.id == id);
  tasks.splice(deletedTask, 1);
  fs.writeFileSync(
    path.join(__dirname, '../../db/notes.json'),
    JSON.stringify({ tasks}, null, 2)
  );
  return res.send();
});

module.exports = router;
