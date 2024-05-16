import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import './App.css'

import Index from './pages/Index'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import User from './pages/User'
import Info from './pages/Info'
import Testing from './pages/Testing'
import Navbar from './components/Navbar'
import { useEffect, useState } from 'react'
import axios from "axios";

function App() {
  const { user } = useAuthContext()
  
  document.title = "Quotes"

  const [userProfile, setUser] = useState(null);

	const getUser = async () => {
		try {
			const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
			const { data } = await axios.get(url, { withCredentials: true });
			setUser(data.user._json);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getUser();
	}, []);

  return (
    <>
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/home/:username" 
              element={user ? <Home /> : <Navigate to="/" />} 
            />
            <Route 
              path="/sign-in" 
              element={!user ? <Login /> : <Navigate to={`/home/${user?.username}`} />} 
            />
            <Route 
              path="/sign-up" 
              element={!user ? <Signup /> : <Navigate to={`/home/${user?.username}`} />} 
            />
            <Route 
              path="/" 
              element={userProfile ? <Home userProfile={userProfile} /> : <Navigate to="/sign-in" />} 
            />
            <Route 
              path="/info" 
              element={<Info />} 
            />
            <Route 
              path="/test" 
              element={<Testing />} 
            />
            <Route 
              path="/:username" 
              element={<User />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App
