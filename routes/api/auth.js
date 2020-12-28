//auth.js
const express = require('express'); // bringing in express

//to use the express router
const router = express.Router();

// when we want to create a route we have to do

// @route         GET api/auth
// @description   Test route
// @access        public

router.get('/', (req, res) => res.send('auth route')); // this sends a response to the server
// that prints the message 'auth route'
// then we want to export this module

module.exports = router; // this exports the variable object express.Router();
