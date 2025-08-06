// App.js
import React, { useEffect, useState } from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'jotai'


import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Login from './components/Login';
import Nav from './components/Nav';
import Signup from './components/Signup';


//import Dashboard from './components/Dash';




import Assign from './components/Assign';
import Tasks from './components/Tasks';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import Profile from './components/Profile';
import AddTask from './components/AddTask';
import AssignTask from './components/AssignTask';
import ProtectedRoutes from './ProtectedRoutes';
import Fallback from './components/Fallback';
// import Detail from './components/taskdetail/Detail';
import TaskDetails from './components/TaskDetails';
import { Spinner } from 'react-bootstrap';
import ForgetPassword from './components/ForgetPassword';
import Resetpassword from './components/ResetPassword';

const Dashboard = React.lazy(() => import("./components/Dash"));



function App() {

  const [loc, setloc] = useState();


  useEffect(() => {
    setloc(window.location.pathname)
  }, [window.location.pathname])

  const excludeNavRoutes = ['/dashboard', '/login', '/signup', '/assign', '/task', '/profile', '/addtask', '/assigntask', '/about'];
  const excludeSidebarRoutes = ['/login', '/signup', '/'];
  return (
    <>
      <div className="app">
        <Provider>
          <Toaster />
          {/* {excludeNavRoutes.includes(loc) || window.location.pathname == `/assign/*` ? null : <Nav />} */}
          {/* {window.location.pathname === '/assign/:taskId' && null} */}
          {/* {excludeSidebarRoutes.includes(window.location.pathname) ? null : <Sidebar />} */}
          <Routes>

            <Route path='/' element={
              <React.Suspense fallback={<Fallback />}>
                <Home />
              </React.Suspense>
            } />


            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path='/forgetpassword' element={<ForgetPassword />} />



            <Route path='/resetpassword' element={
              <React.Suspense fallback={<Fallback />}>
                <Resetpassword />
              </React.Suspense>
            } />



            <Route element={<ProtectedRoutes />}>

              <Route path='/dashboard' element={
                <React.Suspense fallback={<Fallback />}>
                  <Dashboard />
                </React.Suspense>
              } />

              <Route path='/assign' element={
                <React.Suspense fallback={<Fallback />}>
                  <Assign />
                </React.Suspense>
              } />


              <Route path='/assign/:taskId' element={
                <React.Suspense fallback={<Fallback />}>
                  <TaskDetails />
                </React.Suspense>
              } />

              <Route path='/task' element={
                <React.Suspense fallback={<Fallback />}>
                  <Tasks />
                </React.Suspense>
              } />

              <Route path='/profile' element={
                <React.Suspense fallback={<Fallback />}>
                  <Profile />
                </React.Suspense>
              } />



              <Route path='/addtask' element={
                <React.Suspense fallback={< Fallback />}>
                  <AddTask />
                </React.Suspense>
              } />


              <Route path='/assigntask' element={
                <React.Suspense fallback={<Fallback />}>
                  <AssignTask />
                </React.Suspense>
              } />





              {/* <Route path='/assign' element={<Assign />} />
              <Route path='/assign/:taskId' element={<TaskDetails />} /> */}
              {/* <Route path='/task' element={<Tasks />} /> */}
              {/* <Route path='/profile' element={<Profile />} /> */}
              {/* <Route path='/addtask' element={<AddTask />} /> */}
              {/* <Route path='/assigntask' element={<AssignTask />} /> */}

            </Route>
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}

          </Routes>
        </Provider>

      </div >

    </>
  );
}

export default App;
