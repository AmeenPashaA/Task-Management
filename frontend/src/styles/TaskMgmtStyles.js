// ================================================================
// TaskMgmtStyles.js - Task Management UI Component Styling
// Developed by Ameen Pasha.A as a task assignment given by INDPRO company
//
// ▸ Description:
//   This file defines the styles for the Task Management section of the application.
//   It provides layout, animations, and responsive aesthetics using Emotion styling
//   and Material UI (MUI v5).
//
// ▸ Technologies & Dependencies:
//   - React.js (Frontend library)
//   - @mui/material (Material UI Components: Button, Modal, Table, TextField, etc.)
//   - Emotion (CSS-in-JS engine used with MUI)
//   - Responsive and modern UI patterns with transitions, shadows, and gradients
//
// ▸ Key Styled Components:
//   - Task Card Wrapper
//   - Search Input Field
//   - Priority Dropdown
//   - Add Task Button
//   - Modal Box for task creation/editing
//   - Table with styled headers and hover rows
//   - Action buttons/icons for task actions
//
// ▸ UX Features:
//   - Smooth hover animations and transforms
//   - Linear gradients for branding
//   - Clean, accessible table design
//   - Responsive modal layout with spacing
// ================================================================

const TaskMgmtStyles = {
  cardWrapper: {
    width: '100%',
    maxWidth: {
      xs: '100%',
      sm: '100%',
      md: '1200px',
      lg: '1400px',
    },
    boxShadow: 3,
    borderRadius: 8,
    bgcolor: 'background.paper',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    p: {
      xs: 2,
      sm: 3,
      md: 4,
    },
    display: 'flex',
    flexDirection: 'column',
    borderLeft: '3px solid #1976d2',
    borderRight: '3px solid #1976d2',
    m: {
      xs: 1,
      sm: 2,
    },
  },
  headerText: {
    fontSize: {
      xs: 20,
      sm: 22,
      md: 26,
    },
    fontWeight: 700,
    textAlign: 'center',
    color: '#1976d2',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3), -2px -2px 4px rgba(255, 255, 255, 0.3)',
    mb: 3,
  },
  searchField: {
    backgroundColor: '#fafafa',
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: '16px',
      '& fieldset': {
        borderColor: '#ddd',
      },
      '&:hover fieldset': {
        borderColor: '#aaa',
      },
    },
  },
  prioritySelect: {
    backgroundColor: '#f4f6f8',
    borderRadius: '12px',
    width: {
      xs: '100%',
      sm: 'auto',
    },
  },
  addTaskButton: {
    borderRadius: '12px',
    padding: {
      xs: '10px 16px',
      sm: '12px 24px',
    },
    textTransform: 'none',
    fontWeight: 'bold',
    width: {
      xs: '100%',
      sm: 'auto',
    },
    background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
    boxShadow: '0px 4px 12px rgba(25, 118, 210, 0.3)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0px 6px 16px rgba(25, 118, 210, 0.4)',
      background: 'linear-gradient(90deg, #1565c0 0%, #1e88e5 100%)',
    },
  },
  modalWrapper: {
    width: {
      xs: '100%',
      sm: 500,
      md: 600,
    },
    bgcolor: 'background.paper',
    borderRadius: '20px',
    boxShadow: 24,
    p: {
      xs: 2,
      sm: 3,
      md: 4,
    },
    mx: 2,
    my: 2,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  modalHeader: {
    fontWeight: 'bold',
    color: '#1976d2',
    fontSize: {
      xs: 18,
      sm: 20,
      md: 22,
    },
  },
  submitBtn: {
    background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
    color: '#fff',
    borderRadius: '12px',
    fontWeight: 'bold',
    py: {
      xs: 1,
      sm: 1.5,
    },
    '&:hover': {
      background: 'linear-gradient(90deg, #1565c0 0%, #1e88e5 100%)',
    },
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    padding: {
      xs: '12px',
      sm: '16px',
    },
    backgroundColor: '#e0f7fa',
    color: '#333',
    fontSize: {
      xs: 12,
      sm: 14,
    },
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
  actionIcon: {
    fontSize: {
      xs: 20,
      sm: 24,
    },
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
};

export default TaskMgmtStyles;
