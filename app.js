const express = require('express');
const app = express();
const { tasks } = require('./db/db');


function filterByQuery(query, tasksArray) {
    let filteredResults = tasksArray;
    if (query.title) {
      filteredResults = filteredResults.filter(tasks => tasks.title === query.title);
    }
    
    return filteredResults;
  }




app.get('/api/db', (req, res) => {
    let results = tasks;
    if (req.query) {
        results = filterByQuery(req.query, results);
      }
    res.json(results);
    
  });

app.listen(3000, () => {
    console.log(`API server now on port 3000!`);
  });