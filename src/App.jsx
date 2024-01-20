import React from 'react'
import { ThemeProvider } from '@emotion/react'
import CssBaseline from "@mui/material/CssBaseline";

//Theme
import customTheme from './customTheme/customTheme'
import Feed from './components/Feed/FeedScreen'
import WelcomeScreen from './components/Welcome/WelcomeScreen'
import LoginScreen from './components/Login/LoginScreen';
import Register from './components/Register/RegisterScreen'
import SavedPosts from './components/Saved/SavedPosts'
//states
import { useState, useEffect } from 'react'

//browserrouter
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import ResetPage from './components/Resetpage/ResetPageScreen'

//utils
import { getPostFromBackend } from './utils/getPostsFromDatabaseAndSet'
import EventCalender from './components/Calender/EventCalender'
function App() {

  const [isLoggedIn,setIsLoggedIn] = useState(true);
  const [resetAllowed, setResetAllowed] = useState(false);
  const [resetNumber, setResetNumber] = useState(0);
  const [posts,setPosts] = useState([]);
  //1. token aus localstorage auslesen
  //2. Token vorhanden? ja - setze isLoggedIn auf true
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token) {
      setIsLoggedIn(true);
    }
  },[]);
  //Ausloggen funktion
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  }
  const handleLogin = () => {
    setIsLoggedIn(true);
  }
  useEffect(() => {
    getPostFromBackend(setPosts);
  }, []);

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WelcomeScreen/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="/login" element={<LoginScreen handleLogin={handleLogin}/>}/>
            <Route path="/feed" element={isLoggedIn ? <Feed handleLogout={handleLogout} posts={posts} setPosts={setPosts}/> : <Navigate to="/login"/>}/>
            <Route path="/feed" element={isLoggedIn ? <Navigate to="/feed"/>: <Navigate to="/welcome" replace/>}/>
            <Route path="/reset/askEmail" element={<ResetPage  text={
              "Type in your Email to reset passwort"
            } resetAllowed={resetAllowed} setResetAllowed={setResetAllowed} resetNumber={resetNumber} setResetNumber={setResetNumber}
            />}></Route>
            <Route path="/reset/verify" element={<ResetPage text={
              "Type in the code you received via Email"
            } resetAllowed={resetAllowed} setResetAllowed={setResetAllowed} resetNumber={resetNumber} setResetNumber={setResetNumber}
            />}></Route>
            <Route path="/reset/newPassword" element={resetAllowed ?<ResetPage text={
              "Type in your new Password"
            }/> : <Navigate to="/login"/>}></Route>
            <Route path='/savedPosts' element={isLoggedIn ? <SavedPosts handleLogout={handleLogout} posts={posts} setPosts={setPosts}/> : <Navigate to="/login"/> }/>
            <Route path='/calendar' element={<EventCalender handleLogut={handleLogout}/>}/>
          </Routes>
        </BrowserRouter>

        </CssBaseline>
    </ThemeProvider>
  )
}

export default App
