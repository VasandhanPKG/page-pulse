const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const auditRoutes = require('./routes/auditRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', auditRoutes);
app.use(errorHandler);

module.exports = app;
