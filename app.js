const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const bookRoutes = require('./routes/bookRoutes');
require('dotenv').config();
const db=require('./configs/mongoose')
db()

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use('/books', bookRoutes);

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = server;