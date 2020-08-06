const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connect DataBase
connectDB();

// Init Middleware
app.use(express.json({ extended: false}));

app.get('/', (req, res) => res.send("I am Server"));

//  Define Routes
app.use('/api/users' , require('./routes/api/users'));
app.use('/api/profile' , require('./routes/api/profile'));
app.use('/api/posts' , require('./routes/api/posts'));
app.use('/api/auth' , require('./routes/api/auth'));

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`Server has started at ${PORT}`));