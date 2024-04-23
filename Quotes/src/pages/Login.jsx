import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(username, password)
    }

    return(
        <>
        <form className="loginForm" onSubmit={handleSubmit}>
        <h2>Sign in to create bitter posts</h2>
            <input type="text" name="username" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}/> 
            <br />
            <input type="password" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <br />

            {/* error message here */}
            <div className="errorBox">
                {error && <div className="error">{error}</div>}
            </div>

            <button disabled={isLoading}>Sign in</button>
        </form>
        </>
    )
}

export default Login
