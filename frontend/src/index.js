import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Homepage from './components/HomePage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import UserProfile from './components/UserProfile';
import UserPublicProfile from './components/UserPublicProfile';
import { UserContextProvider } from './context/UserContext'; // Import UserContextProvider
import MyImages from './components/MyImages';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path="/home" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/pprofile/:username" element={<UserPublicProfile />} />
      <Route path="/myimages" element={< MyImages />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider> {/* Wrap your RouterProvider with UserContextProvider */}
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>,
);

reportWebVitals();
