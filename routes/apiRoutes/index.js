const router = require('express').Router();
const taskRoutes = require('../apiRoutes/taskRoutes');

router.use(taskRoutes);


module.exports = router;

