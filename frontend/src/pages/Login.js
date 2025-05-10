/*
 * Developed by Ameen Pasha.A as a task assignment given by INDPRO company
 * 
 * This page, Login.js, is a React component that implements the login functionality for the Task Manager application.
 * 
 * The purpose of this page is to allow users to log into the application by providing their email and password. 
 * Upon successful login, the application stores the JWT token, user email, and name in localStorage, and redirects 
 * the user to the dashboard page.
 * 
 * Key Features:
 * 1. Allows users to input their email and password for authentication.
 * 2. Provides password visibility toggle functionality (Show/Hide password).
 * 3. Submits the login credentials to an API endpoint for authentication.
 * 4. If the login is successful, stores the JWT token and user details (email, name) in localStorage.
 * 5. Redirects the user to the dashboard page upon successful authentication.
 * 6. Displays error messages if authentication fails (e.g., incorrect email/password).
 * 7. Provides a link for users to navigate to the signup page if they don't have an account.
 * 
 * Dependencies and Technologies Used:
 * 1. React (useState, useEffect, useNavigate): A JavaScript library for building user interfaces. React is used to manage the state, handle side effects, and navigate between pages.
 * 2. Axios: A promise-based HTTP client for making requests to the API. It's used to send the POST request to the backend server for login.
 * 3. Material-UI (MUI): A popular React UI framework for building responsive and visually appealing user interfaces. The following MUI components are used:
 *    - Container: A wrapper for the page's content.
 *    - Box: A container for the layout with custom styling.
 *    - Typography: Used to display text content such as titles, buttons, and instructions.
 *    - TextField: A form input field used to capture the user's email and password.
 *    - Button: A clickable button that triggers the login action.
 *    - IconButton: A button for toggling the password visibility.
 *    - Grid: A layout component for responsive design, used to align the "Sign Up" text and button.
 *    - Icon components from Material-UI (AccountCircle, LockOutlined, Visibility, VisibilityOff): Icons used in the form for user interaction.
 * 4. React Router DOM: A library used for handling navigation and routing in the application. It enables navigating between pages such as the login page and dashboard.
 * 
 * File Structure:
 * - `Login.js`: Contains the login UI, form validation, and interaction with the backend API to authenticate users.
 * - `apiConfig.js`: Holds API endpoint configurations such as the login endpoint.
 * - `LoginStyles.js`: Custom styling for the login page (using MUI's sx prop and CSS-in-JS).
 * 
 * Author: Ameen Pasha.A
 * Company: INDPRO
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { API_ENDPOINT } from "../Auth/apiConfig";
import {
    TextField,
    Button,
    Typography,
    Box,
    Container,
    Grid,
    IconButton,
} from '@mui/material';
import {
    AccountCircle,
    LockOutlined,
    Visibility,
    VisibilityOff,
} from '@mui/icons-material';
import LoginStyles from '../styles/LoginStyles';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(API_ENDPOINT.Login, {
                email,
                password,
            });

            // Save the JWT token and name in localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('email', email);
            localStorage.setItem('name', response.data.name);

            // Navigate to dashboard
            navigate('/dashboard');
        } catch (error) {
            console.error('Login error:', error);

            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert('Something went wrong. Please try again.');
            }
        }
    };

    useEffect(() => {
        document.body.style.background = 'linear-gradient(135deg, rgb(208, 208, 208), #ffffff)';
        document.body.style.margin = 0;
    }, []);

    return (
        <Container component="main" maxWidth="xs" sx={LoginStyles.pageContainer}>
            <Box sx={LoginStyles.loginBox}>
                <Box sx={LoginStyles.animatedBorder} />

                <Typography variant="h4" gutterBottom sx={LoginStyles.title}>
                    Login
                </Typography>

                <form onSubmit={handleLogin} style={{ width: '100%' }}>
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        required
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <AccountCircle style={{ marginRight: 8, color: '#1976d2' }} />
                            ),
                        }}
                        sx={LoginStyles.textField}
                    />
                    <TextField
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        required
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <LockOutlined style={{ marginRight: 8, color: '#1976d2' }} />
                            ),
                            endAdornment: (
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                    sx={{ color: '#1976d2' }}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            ),
                        }}
                        sx={LoginStyles.passwordField}
                    />
                    <Button type="submit" variant="contained" fullWidth sx={LoginStyles.loginButton}>
                        Login
                    </Button>
                </form>

                <Grid container justifyContent="center" sx={{ marginTop: '20px' }}>
                    <Grid item>
                        <Typography variant="body2" color="textSecondary">
                            {"Don't have an account?"}{' '}
                            <Button onClick={() => navigate('/signup')} sx={LoginStyles.signupText}>
                                Sign Up here
                            </Button>
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default LoginPage;
