import express from 'express';
import users from './api/users';

const app = express();
// @router configuration
app.use('/api/users', users);

export default app;
