const express = require('express');
const app = express();


// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const PORT = process.env.PORT || 3000;
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);





app.listen(PORT, () => {
console.log(`API server now on port ${PORT}!`);
});