const express = require('express');
const connectDB = require('./config/db');
const routes = require("./routes");

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

// Add routes, both API and view
app.use(routes);


const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`Server has started at ${PORT}`));