import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutesV1 from './routes/v1/user.route.js';
import postRoutesV1 from './routes/v1/post.route.js';
import tagRoutesV1 from './routes/v1/tag.route.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Base routes
app.get('/', (req, res) => {
  res.json({ message: "HELLO CARLOS' APP RUNNING" });
});

app.use('/api/v1/users', userRoutesV1);
app.use('/api/v1/posts', postRoutesV1);
app.use('/api/v1/tags', tagRoutesV1);


// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log("HELLO CARLOS' APP RUNNING");
});
