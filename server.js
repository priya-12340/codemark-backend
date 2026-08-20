require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const logRequest = require("./middleware/logger");
const authRoutes = require('./routes/authRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logRequest);
app.use('/api/auth', authRoutes);
app.use('/api/reviews', reviewRoutes);

app.get("/", (req, res) => {
    res.send("codemark backend is running");
});

const PORT = 5000;
connectDB();
app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}.`);
});

