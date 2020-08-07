const express = require('express');
const connectDB = require('./config/db');

const app = express();

require('dotenv').config();
// Connect DataBase
connectDB();

// Configure body parsing for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//  Define Routes
app.use('/api/users' , require('./routes/api/users'));
app.use('/api/profile' , require('./routes/api/profile'));
app.use('/api/posts' , require('./routes/api/posts'));
app.use('/api/auth' , require('./routes/api/auth'));

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`Server has started at ${PORT}`));