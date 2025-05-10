// ===========================
// Dashboard Styles - CSS-in-JS Styling
// Developed by Ameen Pasha.A for the task assignment given by INDPRO company
// This file defines the styles used for the Dashboard UI of the Task Management Application.
// It leverages Material-UI (MUI) components to create a visually attractive, responsive, and modern dashboard layout.
// ===========================

// Importing necessary Material-UI components for styling (not shown in the code, assumed to be in use)
// MUI (Material-UI) library is used for UI components and styles.
// Components like Box, Typography, Card, and others are styled using CSS-in-JS approach here.

// The `dashboardStyles` object contains a collection of custom styles that are applied to the dashboard page.

const dashboardStyles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    px: 2, // Responsive horizontal padding for mobile
  },
  cardWrapper: {
    width: '100%',
    maxWidth: '720px',
    borderRadius: 8,
    p: {
      xs: 2,
      sm: 3,
      md: 4,
    },
    background: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(12px)',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
    borderLeft: '3px solid #1976d2',
    borderRight: '3px solid #1976d2',
  },
  title: {
    fontSize: {
      xs: 20,
      sm: 24,
      md: 26,
    },
    fontWeight: 700,
    textAlign: 'center',
    color: '#1976d2',
    textShadow:
      '2px 2px 4px rgba(0, 0, 0, 0.3), -2px -2px 4px rgba(255, 255, 255, 0.3)',
    mb: 3,
  },
  divider: {
    width: '100%',
    my: 3,
  },
  statCard: (gradient, shadowColor) => ({
    p: {
      xs: 2,
      sm: 2.5,
      md: 3,
    },
    borderRadius: 8,
    background: gradient,
    color: '#fff',
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'row',
    },
    alignItems: 'center',
    gap: {
      xs: 1.5,
      sm: 2,
    },
    boxShadow: `0 12px 30px ${shadowColor}`,
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: `0 18px 45px ${shadowColor.replace('0.4', '0.6')}`,
    },
    textAlign: {
      xs: 'center',
      sm: 'left',
    },
  }),
  subtitle: {
    opacity: 0.8,
  },
  icon: {
    fontSize: {
      xs: 40,
      sm: 50,
    },
  },
};

export default dashboardStyles;
