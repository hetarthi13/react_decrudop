import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import AddUser from './components/AddUser/AddUser';  // Import the AddUser component correctly
import GetUser from './components/getUser/GetUser';
import AddUser from './components/AddUser/Adduser';
import EditUser from './components/EditUser/EditUser';
import { configureStore } from '@reduxjs/toolkit';
import { useEffect } from 'react';

function App() {
  const route = createBrowserRouter([
    {
      path: "/",   // Corrected to `path`
      element: <GetUser />
    },
    {
      path: "/add",  // Another route if needed
      element: <AddUser />
    },
    {
      path: "/edit/:id",  // Another route if needed
      element: <EditUser />
    }
  ]);

// const element1 = <h1>hello</h1>
  useEffect(() => {

  },[]);
  
  return (
    <div className="App">
      <RouterProvider router={route} /> 
    </div>
  );
}

export default App;
