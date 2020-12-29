//posts.js

const express = require('express'); // bringing in express

//to use the express router
const router = express.Router();

// when we want to create a route we have to do

// @route  GET api/posts
// @desc   Test route
// @access public

router.get('/', (req, res) => res.send('posts route'));

// then we want to export this module.

module.exports = router;