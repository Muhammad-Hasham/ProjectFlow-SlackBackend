// server.js
import express from 'express';
import bodyParser from 'body-parser';
import sendTasksToSlack from './src/index.mjs';
import cors from 'cors';

// Load environment variables from .env
import dotenv from 'dotenv';
dotenv.config();

// Initialize Express app
const app = express();

app.use(cors());

// Use JSON body parser middleware
app.use(bodyParser.json());

// POST endpoint for receiving tasks from frontend
app.post('/sendTasksToSlack', async (req, res) => {
    const tasks = req.body.tasks; // Assuming tasks are sent in the request body
    try {
        await sendTasksToSlack(tasks); // Call sendTasksToSlack function
        res.status(200).send('Tasks sent successfully to Slack');
    } catch (error) {
        console.error('Error sending tasks to Slack:', error);
        res.status(500).send('Error sending tasks to Slack');
    }
});

// Start the server
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
