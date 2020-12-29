//auth.js
const express = require('express'); // bringing in express
const { restart } = require('nodemon');

//to use the express router
const router = express.Router();
const auth = require('../../middleware/auth'); // to make my routes secure 
const Users = require('../../models/Users');

const User = require('../../models/Users') // to get the user's info
// when we want to create a route we have to do

// @route         GET api/auth
// @description   Test route
// @access        public

router.get('/', auth, async (req, res) => {
   try {
       const user = await User.findById(req.user.id).select('-password');
       res.json(user);
   }catch(err){
       console.error(err.message);
       res.status(500).send('Server Error');
   }
}); // this sends a response to the server
// that prints the message 'auth route'
// then we want to export this module

module.exports = router; // this exports the variable object express.Router();
