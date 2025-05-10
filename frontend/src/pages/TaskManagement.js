/*
 * Developed by Ameen Pasha.A as a task assignment given by INDPRO company
 *
 * This page, Dashboard.js, is a React component that displays an overview of the task counts in the application,
 * including the total number of tasks, completed tasks, and pending tasks. The data is fetched from the backend API 
 * and displayed in a visually appealing way using Material-UI components.
 *
 * Key Features:
 * 1. **Task Overview**: Displays a summary of the tasks with three key counts: Total Tasks, Completed Tasks, and Pending Tasks.
 * 2. **Dynamic Data Fetching**: Uses `axios` to make a GET request to the API endpoint to fetch the task counts. The API response includes the total, completed, and pending counts, which are displayed on the dashboard.
 * 3. **UI Design**: Utilizes Material-UI's `Box`, `Typography`, `Grid`, and `Divider` components to structure the layout, while incorporating Material-UI icons (`AssignmentIcon`, `CheckCircleIcon`, `HourglassEmptyIcon`) to represent different task statuses.
 * 4. **Error Handling**: Displays an alert if there is an error in fetching the counts from the API.
 * 5. **Responsive Layout**: The layout is responsive, adjusting the number of cards per row based on the screen size (1 per row on smaller screens, 2 on medium, and 3 on larger screens).
 *
 * Dependencies and Technologies Used:
 * 1. **React**: A JavaScript library for building user interfaces. React hooks (`useState`, `useEffect`) are used for managing the state of task counts and performing the side effect of fetching data.
 * 2. **axios**: A promise-based HTTP client used for making API requests to fetch task counts data.
 * 3. **Material-UI (MUI)**: A popular React UI framework for building responsive, customizable, and visually appealing user interfaces. The following MUI components are used:
 *    - `Box`: A layout component used for flexible and responsive layouts.
 *    - `Typography`: Used to display text content, such as titles and task counts.
 *    - `Grid`: Used to create a responsive grid layout for displaying the task overview cards.
 *    - `Divider`: Adds a horizontal line between sections of the content.
 *    - `Icon`: Displays icons (e.g., task icons representing different task statuses).
 * 4. **API Integration**: The component fetches data from the backend API using the `API_ENDPOINT.Counts` endpoint.
 *
 * Author: Ameen Pasha.A
 * Company: INDPRO
 */
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { API_ENDPOINT } from "../Auth/apiConfig";
import {
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    TableContainer,
    Paper,
    Button,
    Modal,
    Chip,
    InputAdornment,
} from '@mui/material';
import {
    Edit,
    Delete,
    TaskAlt,
    Assignment as AssignmentIcon,
    Category as CategoryIcon,
    Notes as NotesIcon,
    CalendarToday as CalendarTodayIcon,
    LowPriority as LowPriorityIcon,
    Event as EventIcon,
    MoreVert as MoreVertIcon,
    Close as CloseIcon,
    Search as SearchIcon,
    Add as AddIcon,
    CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

import TaskMgmtStyles from '../styles/TaskMgmtStyles';

const tableHeaders = [
    { label: 'Task Title', icon: <AssignmentIcon fontSize="small" sx={{ mr: 1 }} /> },
    { label: 'Category', icon: <CategoryIcon fontSize="small" sx={{ mr: 1 }} /> },
    { label: 'Details', icon: <NotesIcon fontSize="small" sx={{ mr: 1 }} /> },
    { label: 'Date Created', icon: <CalendarTodayIcon fontSize="small" sx={{ mr: 1 }} /> },
    { label: 'Priority Level', icon: <LowPriorityIcon fontSize="small" sx={{ mr: 1 }} /> },
    { label: 'Due Date', icon: <EventIcon fontSize="small" sx={{ mr: 1 }} /> },
    { label: 'Status', icon: <CheckCircleIcon fontSize="small" sx={{ mr: 1 }} /> },
    { label: 'Actions', icon: <MoreVertIcon fontSize="small" sx={{ mr: 1 }} /> },
];

const TaskManagement = () => {
    const [search, setSearch] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [dueDateTime, setDueDateTime] = useState('');
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [taskTitle, setTaskTitle] = useState('');
    const [details, setDetails] = useState('');
    const [status, setStatus] = useState('');


    const filteredTasks = tasks.filter(
        (task) =>
            task.task_title.toLowerCase().includes(search.toLowerCase()) ||
            task.category.toLowerCase().includes(search.toLowerCase())
    );

    const fetchTasks = async () => {
        try {
            const response = await axios.get(API_ENDPOINT.GetTaskManagement, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log('Fetched tasks:', response.data.tasks);
            setTasks(response.data.tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error.response || error);
            alert('Failed to fetch tasks');
        }
    };

    useEffect(() => {
        // Initial fetch of tasks when component mounts
        fetchTasks();
    }, []);

    const handleSubmit = async () => {
        const taskData = {
            name: title,
            category,
            description,
            priority,
            deadline: dueDateTime,  // the due date from the input field
        };

        try {
            const response = await axios.post(API_ENDPOINT.TaskManagement, taskData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // if token is required
                    'Content-Type': 'application/json',
                },
            });

            console.log('Task created:', response.data);

            // Success alert
            alert('Task successfully created!');

            // Fetch the updated task list to include the new task
            fetchTasks();

            // Reset form
            setTitle('');
            setCategory('');
            setDescription('');
            setPriority('');
            setDueDateTime('');
            setOpen(false);
        } catch (error) {
            console.error('Error submitting task:', error);
            alert('Failed to create task');
        }
    };


    const handleEdit = (task) => {
        // Set the editing task and prefill the data
        setEditingTask(task);
        setTaskTitle(task.task_title);
        setCategory(task.category);
        setDetails(task.details);
        setPriority(task.priority_level);
        setDueDateTime(task.due_date);
        setStatus(task.status);
    };

    const handleSave = async (taskId) => {
        const updatedTaskData = {
            taskname: taskTitle,
            category,
            description: details,
            priority,
            deadline: dueDateTime,
            status,
        };

        try {
            // Log to confirm data and token are correct
            console.log('Updated Task Data:', updatedTaskData);
            console.log('Token:', localStorage.getItem('token'));

            // Ensure that the API URL is correctly formed
            const apiUrl = API_ENDPOINT.UpdateTaskManagement; // Check this URL
            console.log('API URL:', apiUrl);

            const response = await axios.put(apiUrl, updatedTaskData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log('Task updated:', response.data);

            // Success alert
            alert('Task successfully updated!');

            // Update the local tasks state
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === taskId ? { ...task, ...updatedTaskData } : task
                )
            );

            setEditingTask(null); // Reset editing state
        } catch (error) {
            console.error('Error updating task:', error.response || error);
            alert('Failed to update task');
        }
    };

    const handleDelete = async (taskId) => {
        // Show confirmation prompt
        const isConfirmed = window.confirm('Are you sure you want to delete this task?');

        if (!isConfirmed) {
            return; // If the user cancels, do nothing
        }

        try {
            // Send the DELETE request to the backend with the task ID
            const response = await axios.delete(`${API_ENDPOINT.DeleteTaskManagement}/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Authorization header with the token
                },
            });

            console.log('Task deleted:', response.data);

            // Remove the task from the local state
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
            alert('Failed to delete task');
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, px: 2 }}>
            <Card sx={TaskMgmtStyles.cardWrapper}>
                <CardContent>
                    <Typography variant="h4" sx={TaskMgmtStyles.headerText}>
                        📅 Task Management
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mb: 2 }}>
                        <Box sx={{ flex: 1 }}>
                            <TextField
                                label="Search by title or category..."
                                fullWidth
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon sx={{ color: '#1976d2' }} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={TaskMgmtStyles.searchField}
                            />
                        </Box>

                        <Box sx={{ flex: 0.3 }}>
                            <FormControl fullWidth>
                                <InputLabel>Priority</InputLabel>
                                <Select
                                    value={priorityFilter}
                                    label="Priority"
                                    onChange={(e) => setPriorityFilter(e.target.value)}
                                    sx={TaskMgmtStyles.prioritySelect}
                                >
                                    <MenuItem value="">All</MenuItem>
                                    <MenuItem value="High">High</MenuItem>
                                    <MenuItem value="Medium">Medium</MenuItem>
                                    <MenuItem value="Low">Low</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box sx={{ flex: 0.2 }}>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={() => setOpen(true)}
                                sx={TaskMgmtStyles.addTaskButton}
                            >
                                Add Task
                            </Button>
                        </Box>
                    </Box>
                </CardContent>

                {/* Modal */}
                <Modal open={open} onClose={() => setOpen(false)} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box sx={TaskMgmtStyles.modalWrapper}>
                        <IconButton onClick={() => setOpen(false)} sx={{ position: 'absolute', top: 16, right: 16 }}>
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" mb={2} sx={TaskMgmtStyles.modalHeader}>
                            📝 Create New Task
                        </Typography>

                        <TextField label="Task Title" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
                        <TextField label="Category" fullWidth value={category} onChange={(e) => setCategory(e.target.value)} />
                        <TextField label="Description" multiline minRows={3} fullWidth value={description} onChange={(e) => setDescription(e.target.value)} />

                        <FormControl fullWidth>
                            <InputLabel>Priority</InputLabel>
                            <Select value={priority} onChange={(e) => setPriority(e.target.value)} label="Priority">
                                <MenuItem value="High">High</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="Low">Low</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            label="Due Date & Time"
                            type="datetime-local"
                            fullWidth
                            value={dueDateTime}
                            onChange={(e) => setDueDateTime(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            sx={{ mt: 2 }}
                        />

                        <Button fullWidth variant="contained" onClick={handleSubmit} sx={TaskMgmtStyles.submitBtn}>
                            Submit Task
                        </Button>
                    </Box>
                </Modal>

                <TableContainer component={Paper} sx={{ maxHeight: 400, overflowY: 'auto', borderRadius: '10px', boxShadow: 3 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {tableHeaders.map(({ label, icon }) => (
                                    <TableCell key={label} sx={TaskMgmtStyles.tableHeaderCell}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            {icon}{label}
                                        </Box>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredTasks.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} sx={{ textAlign: 'center', fontStyle: 'italic' }}>
                                        No data available
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredTasks.map((task) => (
                                    <TableRow key={task.id} sx={TaskMgmtStyles.tableRowHover}>
                                        <TableCell>
                                            {editingTask && editingTask.id === task.id ? (
                                                <TextField
                                                    value={taskTitle}
                                                    onChange={(e) => setTaskTitle(e.target.value)}
                                                    fullWidth
                                                />
                                            ) : (
                                                task.task_title
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {editingTask && editingTask.id === task.id ? (
                                                <TextField
                                                    value={category}
                                                    onChange={(e) => setCategory(e.target.value)}
                                                    fullWidth
                                                />
                                            ) : (
                                                task.category
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {editingTask && editingTask.id === task.id ? (
                                                <TextField
                                                    value={details}
                                                    onChange={(e) => setDetails(e.target.value)}
                                                    multiline
                                                    minRows={3}
                                                    fullWidth
                                                />
                                            ) : (
                                                task.details
                                            )}
                                        </TableCell>
                                        <TableCell>{new Date(task.created_at).toLocaleString()}</TableCell>
                                        <TableCell>
                                            {editingTask && editingTask.id === task.id ? (
                                                <Select
                                                    value={priority}
                                                    onChange={(e) => setPriority(e.target.value)}
                                                    fullWidth
                                                >
                                                    <MenuItem value="High">High</MenuItem>
                                                    <MenuItem value="Medium">Medium</MenuItem>
                                                    <MenuItem value="Low">Low</MenuItem>
                                                </Select>
                                            ) : (
                                                task.priority_level
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {editingTask && editingTask.id === task.id ? (
                                                <TextField
                                                    type="datetime-local"
                                                    value={dueDateTime}
                                                    onChange={(e) => setDueDateTime(e.target.value)}
                                                    fullWidth
                                                    InputLabelProps={{ shrink: true }}
                                                />
                                            ) : (
                                                new Date(task.due_date).toLocaleString()
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {editingTask && editingTask.id === task.id ? (
                                                <Select
                                                    value={status}
                                                    onChange={(e) => setStatus(e.target.value)}
                                                    fullWidth
                                                >
                                                    <MenuItem value="Completed">Completed</MenuItem>
                                                    <MenuItem value="Pending">Pending</MenuItem>
                                                </Select>
                                            ) : (
                                                <Chip
                                                    label={task.status === 'Completed' ? 'Completed' : 'Pending'}
                                                    color={task.status === 'Completed' ? 'success' : 'warning'}
                                                    sx={{ fontWeight: 'bold' }}
                                                />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {editingTask && editingTask.id === task.id ? (
                                                <IconButton color="success" onClick={() => handleSave(task.id)}>
                                                    <TaskAlt />
                                                </IconButton>
                                            ) : (
                                                <IconButton color="primary" onClick={() => handleEdit(task)}>
                                                    <Edit />
                                                </IconButton>
                                            )}
                                            <IconButton color="error" onClick={() => handleDelete(task.id)}>
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    );
};

export default TaskManagement;
