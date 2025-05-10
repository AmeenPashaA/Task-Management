/**
 * Task Management Backend API
 * Developed by Ameen Pasha.A
 * Task Assignment for INDPRO Company
 * 
 * Technologies Used:
 * - Node.js with Express.js: Web server and routing
 * - PostgreSQL: Relational database for storing users and tasks
 * - JWT (jsonwebtoken): Token-based authentication
 * - Bcrypt.js: Password hashing for secure authentication
 * - dotenv: To manage environment variables securely
 * - CORS: To enable cross-origin resource sharing between frontend and backend
 * 
 * Dependencies:
 * - express: Web framework for Node.js
 * - pg: PostgreSQL client for Node.js
 * - bcryptjs: Hashing passwords
 * - jsonwebtoken: Handling JWT tokens
 * - cors: Handling CORS headers
 * - dotenv: Loading environment variables from .env file
 * 
 * Folder/Schema Requirements:
 * - A PostgreSQL schema named "taskmgmt_schema" with the following tables:
 *    1. signupusers: Stores registered user information (id, name, email, password, created_at)
 *    2. taskmanagement: Stores task information (id, task_title, category, details, priority_level, due_date, status, created_at)
 * 
 * Endpoints:
 * - POST /api/signup       : Register a new user
 * - POST /api/login        : Login an existing user
 * - POST /api/taskmanagement   : Add a new task
 * - GET /api/getTaskmanagement : Fetch all tasks
 * - PUT /api/updateTaskmanagement : Update an existing task by title
 * - DELETE /api/deleteTaskmanagement/:taskId : Delete a task by ID
 * - GET /api/getCounts     : Get task counts (total, pending, completed)
 * 
 * Notes:
 * - All routes are protected with JWT (authentication middleware `authenticateToken` should be applied where required)
 */

const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

// PostgreSQL setup
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

// Helper function to generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Sign up route
app.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body;

    // Log the incoming request data
    console.log('Incoming request data:', req.body);

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please fill in all fields.' });
    }

    try {
        // Check if the email is already in use
        const result = await pool.query('SELECT * FROM taskmgmt_schema.signupusers WHERE email = $1', [email]);
        if (result.rows.length > 0) {
            return res.status(400).json({ message: 'Email is already in use.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const insertResult = await pool.query(
            'INSERT INTO taskmgmt_schema.signupusers (name, email, password) VALUES ($1, $2, $3) RETURNING id',
            [name, email, hashedPassword]
        );

        // Generate a JWT token for the new user
        const token = generateToken(insertResult.rows[0].id);

        res.status(201).json({
            message: 'Sign up successful!',
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Login route
// Login route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    // Log the incoming request
    console.log('Login attempt:', req.body);

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password.' });
    }

    try {
        // Fetch user by email
        const result = await pool.query(
            'SELECT id, name, email, password, created_at FROM taskmgmt_schema.signupusers WHERE email = $1',
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const user = result.rows[0];

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Generate JWT token
        const token = generateToken(user.id);

        res.status(200).json({
            message: 'Login successful!',
            token,
            name: user.name,  // Include the name field
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

app.post('/api/taskmanagement', async (req, res) => {
    try {
        // Log the request body for debugging
        console.log('Logged data:', req.body);

        const { name, category, description, priority, deadline } = req.body;

        // Ensure status is always 'Pending'
        const status = 'Pending';

        // Generate the token (you might want to extract it from the request headers if it's for authentication)
        const token = generateToken(req.user);  // Assuming req.user is populated by an auth middleware

        // Log the token if needed for debugging purposes
        console.log('Generated Token:', token);

        // Insert the mapped data into the database
        const query = `
            INSERT INTO taskmgmt_schema.taskmanagement 
            (task_title, category, details, priority_level, due_date, status)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        const values = [name, category, description, priority, deadline, status];

        // Execute the insert query
        await pool.query(query, values);

        // Respond to the client with the token (if necessary)
        res.status(200).json({ message: 'Task added successfully.', token });

    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ message: 'An error occurred while adding the task.' });
    }
});

app.get('/api/getTaskmanagement', async (req, res) => {
    try {
        // Assuming the token is part of the request (e.g., in headers or generated elsewhere)
        const token = generateToken(req.user); // Generate the token for the user (if needed)

        // Fetch all tasks from the database
        const querySelect = `
            SELECT id, task_title, category, details, created_at, priority_level, due_date, status
            FROM taskmgmt_schema.taskmanagement;
        `;

        const result = await pool.query(querySelect);
        const tasks = result.rows;  // Get the rows from the query result

        // Respond to the client with the tasks and token
        res.status(200).json({
            message: 'Tasks fetched successfully.',
            token,  // Include the token in the response
            tasks,  // Send the list of tasks
        });

    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'An error occurred while fetching the tasks.' });
    }
});

app.put('/api/updateTaskmanagement', async (req, res) => {
    const { taskname, category, description, priority, deadline, status } = req.body;

    try {
        // Log incoming request data
        console.log('Request Data:', req.body);
        console.log('Request Token:', req.headers.authorization);

        // Check if the task exists by taskname
        const selectQuery = 'SELECT * FROM taskmgmt_schema.taskmanagement WHERE task_title = $1';
        const result = await pool.query(selectQuery, [taskname]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Task found, now update the task
        const updateQuery = `
            UPDATE taskmgmt_schema.taskmanagement
            SET category = $1, details = $2, priority_level = $3, due_date = $4, status = $5
            WHERE task_title = $6
            RETURNING *;
        `;

        const updatedTask = await pool.query(updateQuery, [
            category,
            description,
            priority,
            deadline,
            status,
            taskname
        ]);

        console.log('Updated Task:', updatedTask.rows[0]);

        // Respond with the updated task data
        res.status(200).json({
            message: 'Task updated successfully.',
            updatedTask: updatedTask.rows[0], // Return the updated task details
        });

    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'An error occurred while updating the task.' });
    }
});

app.delete('/api/deleteTaskmanagement/:taskId', async (req, res) => {
    const { taskId } = req.params; // Get the taskId from the URL parameter

    try {
        // Log the taskId to verify
        console.log('Task ID to delete:', taskId);

        // Delete the task from the database
        const deleteQuery = 'DELETE FROM taskmgmt_schema.taskmanagement WHERE id = $1 RETURNING *;';
        const result = await pool.query(deleteQuery, [taskId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }

        console.log('Deleted Task:', result.rows[0]);

        // Respond to the client with a success message
        res.status(200).json({
            message: 'Task deleted successfully.',
            deletedTask: result.rows[0], // Return the deleted task details
        });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'An error occurred while deleting the task.' });
    }
});

app.get('/api/getCounts', async (req, res) => {
    try {
        // Assuming the token is part of the request (e.g., in headers or generated elsewhere)
        const token = generateToken(req.user); // Generate the token for the user (if needed)

        // Query to get the total count, pending count, and completed count
        const querySelect = `
            SELECT 
                COUNT(*) AS total_count,
                COUNT(CASE WHEN status = 'Pending' THEN 1 END) AS pending_count,
                COUNT(CASE WHEN status = 'Completed' THEN 1 END) AS completed_count
            FROM taskmgmt_schema.taskmanagement;
        `;

        const result = await pool.query(querySelect);
        const counts = result.rows[0];  // Get the counts from the query result

        // Respond to the client with the counts and token
        res.status(200).json({
            message: 'Task counts fetched successfully.',
            token,  // Include the token in the response
            counts, // Send the counts (total, pending, completed)
        });

    } catch (error) {
        console.error('Error fetching counts:', error);
        res.status(500).json({ message: 'An error occurred while fetching the task counts.' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
