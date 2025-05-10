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
 * File Structure:
 * - `Dashboard.js`: Contains the logic and UI for displaying the task overview with counts for total, completed, and pending tasks.
 * - `DashboardStyles.js`: Contains custom styles for the dashboard, including styles for the cards and icons.
 * - `apiConfig.js`: Contains the configuration for the API endpoints used throughout the application.
 *
 * Author: Ameen Pasha.A
 * Company: INDPRO
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINT } from '../Auth/apiConfig';
import { Box, Typography, Divider, Grid } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import dashboardStyles from '../styles/DashboardStyles';

const Dashboard = () => {
  // State to store counts data
  const [counts, setCounts] = useState({
    totalCount: 0,
    pendingCount: 0,
    completedCount: 0,
  });

  // Fetch task counts when the component mounts
  const fetchCounts = async () => {
    try {
      const response = await axios.get(API_ENDPOINT.Counts, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      // Set the counts in the state
      setCounts({
        totalCount: response.data.counts.total_count,
        pendingCount: response.data.counts.pending_count,
        completedCount: response.data.counts.completed_count,
      });
    } catch (error) {
      console.error('Error fetching counts:', error);
      alert('Failed to fetch task counts');
    }
  };

  useEffect(() => {
    // Initial fetch of counts when component mounts
    fetchCounts();
  }, []);

  return (
    <Box sx={dashboardStyles.container}>
      <Box sx={dashboardStyles.cardWrapper}>
        <Typography variant="h4" sx={dashboardStyles.title}>
          📊 Task Overview
        </Typography>

        <Divider sx={dashboardStyles.divider} />

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={dashboardStyles.statCard('linear-gradient(145deg, #1e88e5, #42a5f5)', 'rgba(30, 136, 229, 0.4)')}>
              <AssignmentIcon sx={dashboardStyles.icon} />
              <Box>
                <Typography variant="subtitle1" sx={dashboardStyles.subtitle}>Total Tasks</Typography>
                <Typography variant="h4" fontWeight="bold">{counts.totalCount}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Box sx={dashboardStyles.statCard('linear-gradient(145deg, #66bb6a, #43a047)', 'rgba(102, 187, 106, 0.4)')}>
              <CheckCircleIcon sx={dashboardStyles.icon} />
              <Box>
                <Typography variant="subtitle1" sx={dashboardStyles.subtitle}>Completed</Typography>
                <Typography variant="h4" fontWeight="bold">{counts.completedCount}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Box sx={dashboardStyles.statCard('linear-gradient(145deg, #ff9800, #fb8c00)', 'rgba(255, 152, 0, 0.4)')}>
              <HourglassEmptyIcon sx={dashboardStyles.icon} />
              <Box>
                <Typography variant="subtitle1" sx={dashboardStyles.subtitle}>Pending</Typography>
                <Typography variant="h4" fontWeight="bold">{counts.pendingCount}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={dashboardStyles.divider} />
      </Box>
    </Box>
  );
};

export default Dashboard;
