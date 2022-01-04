const express = require('express');
const app = express();
const { tasks } = require('./db/db');

const PORT = process.env.PORT || 3000;


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

app.listen(PORT, () => {
console.log(`API server now on port ${PORT}!`);
});