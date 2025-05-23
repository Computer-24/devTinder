import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'

const Login = () => {
  const [emailId, setEmailId] = useState("mark@example.com")
  const [password, setPassword] = useState("hashedpassword1234")
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        emailId,
        password
      },
        { withCredentials: true })
      dispatch(addUser(response.data.data))
      navigate("/")
    } catch (error) {
      setError(error.response.data)
    }
  }

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Email</legend>
              <input type="text" className="input" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
            </fieldset>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Password</legend>
              <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
            </fieldset>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login