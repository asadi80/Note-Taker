const fs = require('fs');
const path = require('path');


// filter by query
function filterByQuery(query, tasksArray) {
    let filteredResults = tasksArray;
    if (query.title) {
        filteredResults = filteredResults.filter(tasks => tasks.title === query.title);
    }
    
    return filteredResults;
}
//  creat new task
function createNewTask(body, tasksArray) {
    console.log(body);
    const task = body;
    tasksArray.push(task);
    fs.writeFileSync(
        path.join(__dirname, '../db/notes.json'),
        JSON.stringify({ tasks: tasksArray }, null, 2)
        );
    
    return task;
    }

    //  validate task
function validateTask(task) {
    if (!task.title || typeof task.title !== 'string') {
        return false;
    }
    if (!task.text || typeof task.text !== 'string') {
        return false;
    }

    return true;
}

// find by id
function findById(id, tasksArray) {
    const result = tasksArray.filter(task => task.id === id)[0];
    return result;
}

module.exports = {
    filterByQuery,
    findById,
    createNewTask,
    validateTask
};
    