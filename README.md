# Task Manager Frontend 
# Back end repo 
- https://github.com/jhyche80-jpg/Fullstack-Project-Backend
# Website 
- 

## Table of Contents
1. [Overview](#overview)  
   1. [Features](#features)  
   2. [Usage](#usage)  
2. [Problem](#problem)  
   1. [Goal Breakdown](#goal-breakdown)  
   2. [Questions and Answers](#questions-and-answers)  
   3. [Input](#input)  
   4. [Output](#output)  
   5. [Step by Step Plan](#step-by-step-plan)  
3. [Build Steps](#build-steps)  
4. [Troubleshooting](#troubleshooting)  
   1. [Problems](#problems)  
   2. [Solutions](#solutions)  
5. [Reflection](#reflection)  
6. [References](#references)  
   1. [Programs Used](#programs-used)  
   2. [Websites Used](#websites-used)  

---

## Overview
You are a full-stack developer hired by a growing startup to lead the development of their new flagship product, “Pro-Tasker”. The vision is to create a modern, collaborative project management tool that is intuitive for single users but powerful enough for small teams. The application must be built from the ground up using the MERN stack, showcasing a secure, robust, and feature-rich backend API, a dynamic and responsive React frontend, and a seamless deployment pipeline.

This will be the front end code for this project. 

### Features
 - User Management:
    - As a new user, I can create an account and log in.
    - As a logged-in user, my session is managed securely, and I can log out.
- Project Management:
    - As a logged-in user, I can create new projects, giving them a name and description.
    - I can view a dashboard of all the projects I have created.
    - I can view the details of a single project.
    - I can update or delete only the projects that I own.
- Task Management:
    - Within a project I own, I can create new tasks with a title, description, and status (e.g., ‘To Do’, ‘In Progress’, ‘Done’).
    - I can view all tasks belonging to a specific project.
    - I can update the details or status of any task within a project I own.
    - I can delete tasks from a project I own.
- Collaboration (Stretch Goal):
    - As a project owner, I can invite other registered users to collaborate on my project.
    - As a collaborator, I can view and update tasks within a project I’ve been invited to.

---

## Problem
### Goal Breakdown
- Frontend (React)
  - Component-Based Architecture: Build the UI using small, reusable functional components.
  - State Management: Use useState for local component state and the Context API for managing global state (like user authentication).
  - Client-Side Routing: Use a library like react-router-dom to create a single-page application (SPA) experience with distinct pages/views for login, registration, a project dashboard, and individual project details.
  - API Integration: Fetch data from your backend API to dynamically render content. All authenticated requests must include the user’s JWT.
  - User Experience: The application should provide clear feedback for loading and error states.
  - Responsive Design: The UI must be fully responsive and usable on desktop, tablet, and mobile screen sizes.
### Questions and Answers
 ### Input/Output 
---
1. Login-logout-Register pagees


| Action       | Input (body/query)                         | Output (response) |
|--------------|------|-------------------------------------|--------------------------------------------|
| Register     |`{ username, email, password, birthDate }`  | Return to login page                     |
| Login        |`{ username, password }`                    | taken to the main dashboard page         |
| Logout       | Button click                               | You are taken to the login page          |

2. Projects 


| Action         | Input (body/query)                           | Output (response)                                                                  |
|----------------|--------|-------------------------------------|------------------------------------------------------------------------------------|
| Create         | `{ title, due-date  and status }`            | A message saying that the project has been created : duration 5 sseconds           | 
| Delete         | button click                                 | `{message: "Project deleted sussessfully!"}` : duration 5 seconds then disappears  |
| Veiw Projects  | N/A                                          | An array of projects                                                               |
| View Project   | click on the specific project                | navigation to the project (view task)                                              | 
| Update Project | any change  or edit                          | Updated Project information                                                        |

3. Tasks 

| Action       | Input (body/query)                            | Output (response)                                                            |
|--------------|-----------------------------------------------|------------------------------------------------------------------------------|
| Create       | title due date status and also the category   | a message that shows "Task created sucessfully!" or "problem creating task!" | 
| Delete       | button  to delete the task                    | `{message: 'Task deleted' }` or `{message: problem deletinng task} `         |
| Veiw Tasks   | A list of task with a delete and edit buttion | `{taskId, title of task, and task due date of task }`                        |
| Update Task  | change or edit of the task                    |  Updated Task information                                                    |



## Step by Step Plan
1.  Initalize project 
2. Make folder structure 
3. Create the routing structure 
4. DashBoard Layout 
  - Dashboard Section 
    - Projects needed 
    - Upcoming due date for the projects 
    - CHart of projects 
    - Add Project 
  - Project Dashboard 
      - Upcoming due task 
      - add task 
      - chart of task and projects
      - list of projects 
      -  Edit project name / delete project and their task  
  - Task 
    - Show task ,
    - edit task 
    - update task status
    - delete task 
5. Login Page and logic
6. Using axios to fetch data 
7. Redirect user logic 
  

---


## Troubleshooting

Use a simple troubleshooting mindset.

Ask yourself:  
- What should happen right now  
- What is actually happening  
- Test one assumption at a time  

### Problems
List specific problems you faced.

1.  
2.  
3.  

### Solutions
Explain how you solved each problem.

1.  
2.  
3.  

---

## Reflection
Reflect on what you learned, what worked well, and what you would do differently.  
Include lessons about problem solving and debugging.

---

## References

### Programs Used  
- VS Code  
- Node  
- React  
- Postman  / Thunder client 
- Helmet 
- Cors 
- Axios 
- TypeScript 
- JavaScript 
- Browser Router 
- Chart.js 

### Websites Used
Example:  
- MDN  
- Stack Overflow  
- W3Schools  















