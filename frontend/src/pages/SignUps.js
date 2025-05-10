/*
 * Developed by Ameen Pasha.A as a task assignment given by INDPRO company
 *
 * This page, SignUp.js, is a React component that implements the user registration functionality for the Task Manager application.
 *
 * The purpose of this page is to allow users to create an account by providing their full name, email, and password. The form
 * also includes a confirmation password field to ensure the user’s password is entered correctly.
 * Upon successful registration, the user's details are sent to the server, and the user is redirected to the login page.
 *
 * Key Features:
 * 1. Allows users to input their full name, email, password, and confirm password to register.
 * 2. Provides password visibility toggle functionality (Show/Hide password) for both password and confirm password fields.
 * 3. Validates that the password and confirm password fields match before submitting the form.
 * 4. Sends a POST request with the user data to the backend API endpoint for user creation.
 * 5. If the registration is successful (HTTP status 201), the user is alerted and redirected to the login page.
 * 6. Displays an error message if the password and confirm password don't match or if there is any error during the registration process.
 * 7. Provides a link for users to navigate to the login page if they already have an account.
 *
 * Dependencies and Technologies Used:
 * 1. React (useState, useEffect, useNavigate): A JavaScript library for building user interfaces. React hooks (useState, useEffect) are used to manage form inputs and handle side effects.
 * 2. Axios: A promise-based HTTP client for making requests to the API. It's used to send the POST request to the backend server to register the user.
 * 3. Material-UI (MUI): A popular React UI framework for building responsive and visually appealing user interfaces. The following MUI components are used:
 *    - Container: A wrapper for the page's content.
 *    - Box: A container for the layout with custom styling.
 *    - Typography: Used to display text content such as titles, buttons, and instructions.
 *    - TextField: A form input field used to capture the user's full name, email, password, and confirm password.
 *    - Button: A clickable button that triggers the registration action.
 *    - IconButton: A button for toggling the password visibility for both password fields.
 *    - Grid: A layout component for responsive design, used to align the "Login" text and button.
 *    - Icon components from Material-UI (AccountCircle, LockOutlined, Visibility, VisibilityOff, Email): Icons used in the form for user interaction.
 * 4. React Router DOM: A library used for handling navigation and routing in the application. It enables navigating between pages such as the sign-up page and login page.
 *
 * File Structure:
 * - `SignUps.js`: Contains the sign-up UI, form validation, and interaction with the backend API to create a user.
 * - `apiConfig.js`: Holds API endpoint configurations such as the sign-up endpoint.
 * - `SignUpStyles.js`: Custom styling for the sign-up page (using MUI's sx prop and CSS-in-JS).
 *
 * Author: Ameen Pasha.A
 * Company: INDPRO
 */

import React, { useState } from 'react';
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
    IconButton
} from '@mui/material';
import {
    AccountCircle,
    LockOutlined,
    Visibility,
    VisibilityOff,
    Email
} from '@mui/icons-material';
import SignUpStyles from '../styles/SignUpStyles'; // Import the styles

const SignUpPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
    
        // Check if password and confirm password match
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }
    
        // Send the user data to the server
        try {
            const response = await axios.post(API_ENDPOINT.SignUp, {
                name,
                email,
                password,
                confirmPassword,
            });
    
            if (response.status === 201) {
                alert('Sign up successful!');
                navigate('/'); // Redirect to login page
            } else {
                alert(response.data.message); // Show error message from the server
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred during sign up.');
        }
    };
    
    React.useEffect(() => {
        document.body.style.background = 'linear-gradient(135deg, rgb(208, 208, 208), #ffffff)';
        document.body.style.margin = 0;
    }, []);

    return (
        <Container
            component="main"
            maxWidth="xs"
            sx={SignUpStyles.pageContainer}
        >
            <Box sx={SignUpStyles.signUpBox}>
                <Typography variant="h4" gutterBottom sx={SignUpStyles.title}>
                    Sign Up
                </Typography>

                <form onSubmit={handleSignUp} style={{ width: '100%' }}>
                    <TextField
                        label="Full Name"
                        type="text"
                        fullWidth
                        required
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <AccountCircle style={{ marginRight: 8, color: '#1976d2' }} />
                            ),
                        }}
                        sx={SignUpStyles.textField}
                    />

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
                                <Email style={{ marginRight: 8, color: '#1976d2' }} />
                            ),
                        }}
                        sx={SignUpStyles.textField}
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
                        sx={SignUpStyles.passwordField}
                    />

                    <TextField
                        label="Confirm Password"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        required
                        variant="outlined"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                        sx={SignUpStyles.passwordField}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={SignUpStyles.signUpButton}
                    >
                        Sign Up
                    </Button>
                </form>

                <Grid container justifyContent="center" sx={{ marginTop: '20px' }}>
                    <Grid item>
                        <Typography variant="body2" color="textSecondary">
                            Already have an account?{' '}
                            <Button
                                onClick={() => navigate('/')}
                                sx={SignUpStyles.loginText}
                            >
                                Login here
                            </Button>
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default SignUpPage;
