import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordCheck, setPasswordCheck] = useState("")
    const {signup, isLoading, error} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(username, password, passwordCheck)
    }

    return(
        <>
        <form className="loginForm" onSubmit={handleSubmit}>
            <h2>Become a pretentious quoter!</h2>
            <input type="text" name="username" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}/> 
            <br />
            <input type="password" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <br />
            <input type="password" name="password" placeholder="password" value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)}/>
            <br />

            {/* error message here */}
            <div className="errorBox">
                {error && <div className="error">{error}</div>}
            </div>

            <button disabled={isLoading}>Sign up</button>
        </form>
        </>
    )
}

export default Signup
