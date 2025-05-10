// apiConfig.js
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const API_ENDPOINT = {
  SignUp: `${API_BASE_URL}/signup`,
  Login: `${API_BASE_URL}/login`,
  Counts: `${API_BASE_URL}/getCounts`,
  TaskManagement: `${API_BASE_URL}/taskmanagement`,
  GetTaskManagement: `${API_BASE_URL}/getTaskmanagement`,
  UpdateTaskManagement: `${API_BASE_URL}/updateTaskmanagement`,
  DeleteTaskManagement: `${API_BASE_URL}/deleteTaskmanagement`,
};
