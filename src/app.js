const express = require('express');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const apiRoutes = require('./routes/api.routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ success: true, message: 'OK' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api', apiRoutes);

app.use(errorHandler);

module.exports = app;
