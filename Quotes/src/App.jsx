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

function App() {
  const { user } = useAuthContext()

  document.title = "Quotes"

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
              element={<Index />} 
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
