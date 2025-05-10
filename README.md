# README by Ameen Pasha.A

## Task Management App

### Task Assignment for INDPRO Company

#### All the dependencies and brief logic added in the header of each file

##### Any queries feel free to connect with me email: ameenpa05@gmail.com  contact:+91 8904471468

###### Github link for this project: https://github.com/AmeenPashaA/Task-Management.git
---

## Overview

This is a Task Management application developed as part of a task assignment for INDPRO. The application allows users to register, log in, and manage tasks. It includes functionalities like creating tasks, updating them, deleting them, and viewing task counts.

---

## Technologies Used

### Backend
- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Framework for building RESTful APIs.
- **PostgreSQL**: Relational database to store user and task information.
- **bcryptjs**: Library for password hashing and comparison.
- **JWT (JSON Web Token)**: Used for authentication and generating tokens.
- **dotenv**: For managing environment variables.
- **CORS**: To enable cross-origin requests.

### Frontend
- **React.js**: A JavaScript library for building user interfaces, used to create the task management interface.
- **Material-UI (MUI)**: A popular React UI framework to design the user interface with Material Design principles. It includes components like buttons, cards, and forms, which are extensively used in the app.
- **Axios**: Promise-based HTTP client for making API requests from the React frontend.
- **React Router**: For navigation between different views in the React application (e.g., Login, Signup, Task Dashboard).

### Authentication
- **bcryptjs**: Password hashing and comparison.
- **JWT (JSON Web Tokens)**: For authentication and authorization.

### Database
- **PostgreSQL**: Version 17

## Installation
- **Frontend**: Start Service - 
D:\taskManager\frontend - 
npm start
- **Port**:3000

- **Backend**: Start Service - 
D:\taskManager\backend - 
node server.js
- **Port**:5000

- **DatabaseDetails**:
DBName: taskMgmt_db
DBSchema: taskmgmt_schema

Table 1:
CREATE TABLE IF NOT EXISTS taskmgmt_schema.signupusers
(
    id integer NOT NULL DEFAULT nextval('taskmgmt_schema.signupusers_id_seq'::regclass),
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT signupusers_pkey PRIMARY KEY (id),
    CONSTRAINT signupusers_email_key UNIQUE (email)
)

Table 2:
CREATE TABLE IF NOT EXISTS taskmgmt_schema.taskmanagement
(
    id integer NOT NULL DEFAULT nextval('taskmgmt_schema.taskmanagement_id_seq'::regclass),
    task_title text COLLATE pg_catalog."default" NOT NULL,
    category text COLLATE pg_catalog."default" NOT NULL,
    details text COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    priority_level text COLLATE pg_catalog."default" NOT NULL,
    due_date text COLLATE pg_catalog."default" NOT NULL,
    status text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT taskmanagement_pkey PRIMARY KEY (id)
)