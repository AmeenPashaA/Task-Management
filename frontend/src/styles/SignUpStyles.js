// ==============================================
// SignUpStyles.js - Styling Configuration for Sign Up Page
// Developed by Ameen Pasha.A as a task assignment given by INDPRO company
//
// ▸ Description:
//   This file contains the responsive and modern design styles used to style the Sign Up
//   form in a Task Management Application. Built using CSS-in-JS, compatible with
//   Material UI (MUI v5), for dynamic UI theming and clean visual effects.
//
// ▸ Technologies & Dependencies:
//   - React.js (Frontend Library)
//   - @mui/material: Material UI Core Components (TextField, Button, Box, etc.)
//   - Emotion: CSS-in-JS styling engine used internally by MUI v5
//
// ▸ Styled Components:
//   - Container Wrapper
//   - Sign Up Card (Box)
//   - Text Fields
//   - Sign Up Button
//   - Redirect to Login Text
//
// ▸ Features:
//   - Fully responsive layout (mobile/tablet ready)
//   - Hover/focus interactivity on form inputs
//   - Gradient buttons and primary color branding
//   - Adaptive padding and text sizing based on viewport width
// ==============================================

const SignUpStyles = {
    pageContainer: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '@media (max-width: 600px)': {
            height: 'auto',
        },
    },
    signUpBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        padding: '40px',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        overflow: 'hidden',
        borderLeft: '5px solid #1976d2',
        '@media (max-width: 768px)': {
            padding: '20px',
        },
        '@media (max-width: 600px)': {
            maxWidth: '90%',
            borderLeft: 'none',
        },
    },
    title: {
        color: '#1976d2',
        fontWeight: 'bold',
        letterSpacing: 1.5,
        fontSize: '30px',
        '@media (max-width: 768px)': {
            fontSize: '24px',
        },
        '@media (max-width: 600px)': {
            fontSize: '20px',
        },
    },
    textField: {
        marginBottom: '20px',
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                borderColor: '#1976d2',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#1976d2',
            },
        },
        '@media (max-width: 600px)': {
            marginBottom: '15px',
        },
    },
    passwordField: {
        marginBottom: '30px',
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                borderColor: '#1976d2',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#1976d2',
            },
        },
        '@media (max-width: 600px)': {
            marginBottom: '20px',
        },
    },
    signUpButton: {
        padding: '12px',
        fontSize: '16px',
        fontWeight: 'bold',
        borderRadius: '8px',
        background: 'linear-gradient(135deg, #1976d2, #1565c0)',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
        ':hover': {
            background: 'linear-gradient(135deg, #1565c0, #1976d2)',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)',
        },
        '@media (max-width: 600px)': {
            padding: '10px',
            fontSize: '14px',
        },
    },
    loginText: {
        textTransform: 'none',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#1976d2',
        ':hover': {
            textDecoration: 'underline',
        },
        '@media (max-width: 600px)': {
            fontSize: '14px',
        },
    },
};

export default SignUpStyles;
