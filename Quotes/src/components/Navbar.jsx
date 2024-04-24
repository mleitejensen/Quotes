import { Link } from 'react-router-dom'
import '../App.css'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const {logout} = useLogout()
  const {user} = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header>
        <nav>
        <Link to="/">
          <h1>Logo</h1>
        </Link>

        {!user && (
        <Link to="/">
            <h1>Quotes</h1>
        </Link>
        )}
        {user && (
        <Link to={`/home/${user.username}`}>
            <h1>Quotes - {user.username}</h1>
        </Link>
        )}

        {user && (
          <>
            <div className='infoAndLogout'>
            <Link to="/info">
              <h1>Info</h1>
            </Link>
              <button onClick={handleClick}>Logout</button>
            </div>
          </>
        )}
        {!user && (
          <div className='navLoginSignup'>
            <Link to="/sign-in">
                <h1>Login</h1>
            </Link>
            <h1>/</h1>
            <Link to="/sign-up">
                <h1>Signup</h1>
          </Link>
          </div>
        )}
        </nav>
    </header>
  )
}

export default Navbar