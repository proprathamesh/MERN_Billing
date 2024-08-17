// server.js

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('./db'); // Ensure you have the correct path to db.js

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const profile = require('./routes/profile');
const car = require('./routes/car');
const km = require('./routes/km');
const protectedRoutes = require("./routes/protectedRoute");

// Your middleware and routes setup

app.use('/api/profile', profile);
app.use('/api/car', car);
app.use("/api/km", km);
app.use("/api", protectedRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
