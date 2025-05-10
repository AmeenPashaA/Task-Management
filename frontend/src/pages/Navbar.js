/*
 * Developed by Ameen Pasha.A as a task assignment given by INDPRO company
 *
 * This page, Navbar.js, is a React component that represents the navigation bar (navbar) of the Task Manager application.
 * It includes a top app bar, user profile avatar, menu options (logout), and a tab navigation system between the Dashboard
 * and Task Management sections of the application.
 *
 * Key Features:
 * 1. **App Bar**: The app bar is sticky at the top of the page, displaying the title "Task Manager".
 * 2. **Tabs Navigation**: Users can toggle between two primary sections of the app—Dashboard and Task Management. This is handled by Material-UI's Tabs component, which is interactive.
 * 3. **User Profile Avatar**: Displays a circular avatar with the user's initials (first letter of their email) in the top right corner of the navbar.
 * 4. **User Profile Menu**: When the user clicks on their avatar, a menu opens displaying their name (if available) and an option to log out.
 * 5. **Logout Functionality**: Clicking the "Logout" menu item removes the authentication token from localStorage and redirects the user to the login page.
 * 6. **Dynamic User Information**: The component fetches the user's email and name from localStorage and displays their initials in the avatar. If the name is not found, it defaults to 'User'.
 * 7. **Custom Styling**: The navbar is styled using Material-UI's `sx` prop, with the `NavbarStyles` object managing styles for the app bar, tabs, avatar, and more.
 *
 * Dependencies and Technologies Used:
 * 1. **React**: A JavaScript library for building user interfaces. React hooks (`useState`, `useEffect`) manage state (e.g., tab index, user details, and avatar) and side effects (e.g., background color changes).
 * 2. **Material-UI (MUI)**: A popular React UI framework for building responsive, customizable, and visually appealing user interfaces. The following MUI components are used:
 *    - `AppBar`, `Toolbar`: Creates the top app bar containing the title and user profile.
 *    - `Typography`: Displays text content such as the app title and user name.
 *    - `Box`: A container used for layout and spacing purposes.
 *    - `Tabs`, `Tab`: Creates the tab navigation to toggle between the Dashboard and Task Management views.
 *    - `Avatar`: Displays the user's profile avatar with their initials.
 *    - `IconButton`: A clickable button to open the user profile menu when the user clicks on the avatar.
 *    - `Menu`, `MenuItem`: Displays the profile menu with the logout option.
 *    - `Tooltip`: Provides a hover tooltip for the user avatar icon.
 *    - `Divider`: Adds a horizontal divider between sections of the profile menu.
 * 3. **React Router DOM**: A library used for managing navigation between components and redirecting to the login page after logout.
 * 4. **useTheme**: A hook from Material-UI used to access the current theme for responsive and consistent styling across the app.
 *
 * File Structure:
 * - `Navbar.js`: Contains the navbar UI, navigation logic (Tabs), and user authentication actions (Logout).
 * - `DashboardContent.js`: Component that displays the Dashboard section of the app when the Dashboard tab is selected.
 * - `TaskManagement.js`: Component that displays the Task Management section when the Task tab is selected.
 * - `NavbarStyles.js`: Contains custom styles used in the Navbar, leveraging MUI's `sx` prop for styling.
 *
 * Author: Ameen Pasha.A
 * Company: INDPRO
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Box, Avatar, Menu, MenuItem, Divider,
  IconButton, Tooltip, Tabs, Tab
} from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DashboardIcon from '@mui/icons-material/Dashboard';

import DashboardContent from './Dashboard';
import TaskContent from './TaskManagement';
import { useTheme } from '@mui/system';
import NavbarStyles from '../styles/NavbarStyles';

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Get email from localStorage
    const storedEmail = localStorage.getItem('email');
    setEmail(storedEmail);
  }, []);

  useEffect(() => {
    // Retrieve name from localStorage
    const storedName = localStorage.getItem('name');
    setUserName(storedName);
  }, []);

  const userInitial = email ? email.charAt(0).toUpperCase() : 'U';  // Default to 'U' if email is not found

  const [anchorEl, setAnchorEl] = useState(null);
  const [tabIndex, setTabIndex] = useState(() => {
    const storedTab = localStorage.getItem('tabIndex');
    return storedTab !== null ? parseInt(storedTab, 10) : 0;
  });


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleTabChange = (_, newValue) => {
    setTabIndex(newValue);
    localStorage.setItem('tabIndex', newValue);
  };

  useEffect(() => {
    document.body.style.background = '#f4f4f9';
    document.body.style.margin = 0;
  }, []);

  return (
    <Box>
      <AppBar position="sticky" sx={NavbarStyles.appBar}>
        <Toolbar sx={NavbarStyles.toolbar}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" sx={NavbarStyles.title}>
              Task Manager
            </Typography>
          </Box>

          <Box sx={NavbarStyles.tabsContainer}>
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              centered
              TabIndicatorProps={{ style: { display: 'none' } }}
              sx={NavbarStyles.tabs}
            >
              <Tab icon={<DashboardIcon />} iconPosition="start" label="Dashboard" />
              <Tab icon={<AssignmentIcon />} iconPosition="start" label="Task" />
            </Tabs>
          </Box>

          <Box>
            <Tooltip title="User Profile" placement="bottom">
              <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                <Avatar sx={NavbarStyles.avatar(theme)}>{userInitial}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} sx={{ mt: 2 }}>
              <Box sx={NavbarStyles.menuUserBox}>
                <Typography variant="h6">
                  {userName ? userName : 'User'}
                </Typography>
              </Box>
              <Divider />
              <MenuItem onClick={handleLogout} sx={NavbarStyles.logoutItem}>
                <ExitToApp sx={{ mr: 1, color: 'inherit' }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={NavbarStyles.contentWrapper}>
        <Box sx={NavbarStyles.contentInner}>
          {tabIndex === 0 && <DashboardContent />}
          {tabIndex === 1 && <TaskContent />}
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
