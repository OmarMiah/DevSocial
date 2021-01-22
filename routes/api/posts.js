//posts.js

const express = require('express'); // bringing in express

//to use the express router
const router = express.Router();

const {check, validationResult} = require('express-validator/check');
const auth = require ('../../middleware/auth');

// bringing in models to get the name the avatar and the user 

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/Users');

// @route  Post api/posts
// @desc   Create a post
// @access private

router.post('/',[auth, [
    check('text', 'Text is required').not().isEmpty()
]], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try {

        // we're logged in so we can send the user id 
        const user = await (await User.findById(req.user.id)).isSelected('-password');

        const newPost = new Post({
            text: req.body.text, 
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });
    
        const post = await newPost.save(); 

        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }

  

});

// then we want to export this module.


// @Route   GET api/posts 
// @desc    Get all posts 
// @access  Private

router.get('/', auth, async (req,res) => {
    try {
        const posts = await Post.find().sort({date: -1});
        res.json(posts);
    } catch (err) {
        console.err(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
