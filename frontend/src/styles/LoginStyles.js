// ===========================
// Login Styles - CSS-in-JS Styling
// Developed by Ameen Pasha.A for the task assignment given by INDPRO company
// This file defines the styling for the Login Page of a Task Management Application.
// The styles are built using the CSS-in-JS approach compatible with MUI (Material-UI v5).
//
// ▸ Dependencies:
//   - @mui/material: Core Material UI components (e.g., Box, TextField, Button)
//   - @mui/styles (optional if using legacy styling, but not required with sx prop)
//   - React
//
// ▸ Components Using These Styles:
//   - LoginPage.jsx or LoginForm.jsx
//   - MUI components like <Box>, <TextField>, <Button> are styled using this object
//
// ▸ Features:
//   - Responsive design for mobile and tablet viewports
//   - Hover and focus states for interactivity
//   - Animated border and gradient button for modern UI
//   - Adaptive layout with breakpoints for 768px and 600px widths
// ===========================

const LoginStyles = {
  pageContainer: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '@media (max-width: 600px)': {
          height: 'auto',
      },
  },
  loginBox: {
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
      transition: 'all 0.3s ease',
      borderLeft: '5px solid #1976d2',
      '@media (max-width: 768px)': {
          padding: '20px',
      },
      '@media (max-width: 600px)': {
          maxWidth: '90%',
          borderLeft: 'none',
      },
  },
  animatedBorder: {
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      borderLeft: '5px solid #1976d2',
      zIndex: -1,
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
  loginButton: {
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
  signupText: {
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

export default LoginStyles;
