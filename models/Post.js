// Bringing in mongoose

// Building a schema for posts created by a single user


const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const PostSchema = new Schema({
    // post connected to user
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
        // users can delete their own posts
        // shows which user created it 
    },
    text:{
        type: String,
        required: true
    },
    name: {
        type: String
    }, 
    avatar: {
        // option to not delete a post if a user deletes their account
        type: String
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String, 
                required: true
            },
            name:{
                type: String
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date, 
        default: Date.now
    }
});

module.exports = Post = mongoose.model('post', PostSchema);
