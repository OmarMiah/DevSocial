//auth.js
const express = require('express'); // bringing in express
const { restart } = require('nodemon');
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator/check');
//to use the express router
const bcrypt = require('bcryptjs');
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


router.post('/', [
    check('email', 'please include a valid email').isEmail(),
    check('password','Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()});
    }
  
    const {email, password} = req.body;
    try {
      let user = await User.findOne({email});
  
      if(!user){
        res.status(400).json({errors: [{msg: 'Invalid credentials'}]});
      }
    
      const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch){
          return res.status(400).json({errors: [{msg:'Invalid Credentials'}] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };
  
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {expiresIn: 360000},
        (err,token) => {
          if(err) throw err;
          res.json({token});
        });
    }catch(err) { 
      console.error(err.message);
      res.status(500).send('Server error');
    }
    
  });
module.exports = router; // this exports the variable object express.Router();
