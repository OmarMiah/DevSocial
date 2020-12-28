// server.js

const express = require('Express');

const connectDB = require('./config/db');

const app = express();

//connect database
connectDB();

//Testing API
app.get('/', (req, res) => res.send('API Running'));

//Initialize The Middleware
app.use(express.json({ extended: false })); // this will allow us to get the data in the body that is in our registered user

//Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts')); // this routes it users

// we could do users/register
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
