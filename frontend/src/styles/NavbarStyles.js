// ==============================================
// NavbarStyles.js - Styling Configuration for Navbar
// Developed by Ameen Pasha.A as a task assignment given by INDPRO company
//
// ▸ Description:
//   This file defines the custom styling for the application's top navigation bar (Navbar),
//   using the CSS-in-JS approach compatible with Material UI (MUI v5). The styles apply
//   to AppBar, Toolbar, Tabs, Avatar, and menu items.
//
// ▸ Technologies & Dependencies:
//   - React.js (Frontend Framework)
//   - @mui/material: MUI v5 Core Components (AppBar, Toolbar, Tabs, Tab, Avatar, Menu, etc.)
//   - Emotion (for `sx` prop or MUI-style objects)
//
// ▸ Components Styled by This File:
//   - <AppBar />
//   - <Toolbar />
//   - <Tabs />, <Tab />
//   - <Avatar />
//   - Menu-related components (Logout, UserBox)
//
// ▸ Design Features:
//   - Gradient Text and Tabs
//   - Responsive Layout
//   - Hover Effects and Transitions
//   - Dynamic Avatar Background using MUI Theme
//   - Clean and Modern Aesthetic
// ==============================================

const NavbarStyles = {
  appBar: {
    backgroundColor: '#ffffff',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    borderBottom: '3px solid #1976d2',
    borderRadius: {
      xs: '0px', // No border radius on small screens
      sm: '8px',
      md: '16px',
    },
    px: {
      xs: 1,
      sm: 2,
      md: 3,
    },
  },
  toolbar: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'row',
    },
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: {
      xs: 1,
      sm: 2,
    },
    py: {
      xs: 1,
      sm: 1.5,
    },
  },
  title: {
    color: 'transparent',
    background: 'linear-gradient(to right, #1976d2, #4caf50)',
    backgroundClip: 'text',
    fontWeight: 'bold',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    display: 'inline-block',
    fontSize: {
      xs: 18,
      sm: 20,
      md: 24,
    },
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  tabsContainer: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    mt: {
      xs: 1,
      sm: 0,
    },
  },
  tabs: {
    borderRadius: '8px',
    px: 2,
    maxWidth: '100%',
    overflowX: {
      xs: 'auto',
      sm: 'visible',
    },
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    background: 'linear-gradient(to right, #e0f7fa, #b3e5fc)',
    '& .MuiTab-root': {
      fontWeight: 500,
      fontSize: {
        xs: '14px',
        sm: '16px',
      },
      textTransform: 'none',
      px: {
        xs: 2,
        sm: 3,
      },
      color: '#333',
      transition: 'all 0.3s ease',
      borderRadius: '6px',
      padding: {
        xs: '8px 16px',
        sm: '12px 24px',
      },
      whiteSpace: 'nowrap',
      '&:hover': {
        background: '#81d4fa',
        color: '#1e88e5',
      },
      '&.Mui-selected': {
        color: '#ffffff',
        background: 'linear-gradient(to right, #1e88e5, #0d47a1)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  avatar: (theme) => ({
    backgroundColor: theme?.palette?.primary?.main || '#1976d2',
    cursor: 'pointer',
    transition: 'transform 0.3s ease-in-out',
    width: {
      xs: 32,
      sm: 40,
    },
    height: {
      xs: 32,
      sm: 40,
    },
    '&:hover': {
      transform: 'scale(1.1)',
    },
  }),
  menuUserBox: {
    padding: 2,
    minWidth: {
      xs: 180,
      sm: 200,
    },
  },
  logoutItem: {
    color: 'error.main',
    '&:hover': {
      backgroundColor: 'error.light',
      color: 'white',
    },
  },
  contentWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '85vh',
    },
    contentInner: {
      width: '100%',
      maxWidth: '1400px',
      p: 2,
    },
};

export default NavbarStyles;

  