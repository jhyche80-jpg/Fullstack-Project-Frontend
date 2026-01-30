import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProjectDashBoard from './pages/ProjectPage/ProjectDashBoard'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import TaskDashBoard from './pages/taskPage/TaskDashBoard'
import Login from './pages/Authorize/Login'
import Register from './pages/Authorize/Register'
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        {/* If you cannot login register  */}
        <Route path='/register' element={<Register />} />
        {/*Once Logged in navigate to this page */}
        <Route path='/projects' element={<ProjectDashBoard />} />
        {/* clicking a specific task will cause you to navigate to that tasks for the projects */}
        <Route path='projects/:projectId/tasks' element={<TaskDashBoard />} />
        {/* if what i am trying to do is a no no .. */}
        <Route path='*' element={<ErrorPage />} />
      </Routes >
    </>
  )
}

export default App
