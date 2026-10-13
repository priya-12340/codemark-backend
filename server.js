require('dotenv').config();
const { generalLimiter } = require('./middleware/rateLimiter');
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const logRequest = require("./middleware/logger");
const authRoutes = require('./routes/authRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const sendError = require('./utils/errorHandler');

const app = express();

app.use(generalLimiter);
app.use(cors());
app.use(express.json());
app.use(logRequest);
app.use('/api/auth', authRoutes);
app.use('/api/reviews', reviewRoutes);


app.get("/", (req, res) => {
    res.send("codemark backend is running");
});

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Invalid JSON' });
  }
  return sendError(res, err);
});

const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}.`);
});

