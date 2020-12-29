//user.js

const express = require('express'); // bringing in express

const User = require('../../models/Users');
const gravatar = require('gravatar');
const config = require('config');
const jwt = require('jsonwebtoken');
//to use the express router
const router = express.Router();
const bcrypt = require('bcryptjs');

const {check, validationResult} = require('express-validator/check');
const { JsonWebTokenError } = require('jsonwebtoken');
// when we want to create a route we have to do

// @route  POST api/users
// @desc   REGISTER user
// @access public

router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'please include a valid email').isEmail(),
  check('password','Please enter a password with six or more characters').isLength({min: 6})
],
async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }

  const {name, email, password} = req.body 

  try {
    let user = await User.findOne({email});

    if(user){
      res.status(400).json({errors: [{msg: 'User already exists'}]});
    }

    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    })
  
    user = new User({
      name,
      email,
      avatar,
      password
    });
    //Encrypt password 
  
    const salt = await bcrypt.genSalt(10);
    
    user.password = await bcrypt.hash(password,salt);
  
    await user.save();
  
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

// then we want to export this module.
module.exports = router;
