const express = require('express');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const apiRoutes = require('./routes/api.routes');
const adminRoutes = require('./routes/admin.routes');
const adminAuthRoutes = require('./routes/admin.auth.routes');
const errorHandler = require('./middlewares/error.middleware');
const swaggerUi = require('swagger-ui-express'); 
const specs = require('../../morning-insight/src/swagger');
const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ success: true, message: 'OK' });
});
// In app.js
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
});
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/admin/auth', adminAuthRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1', apiRoutes);

app.use(errorHandler);

module.exports = app;
