import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/session";
import { Navigate } from "react-router-dom";

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to='/' replace={true} />;

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors({});

    return dispatch(loginUser({ credential, password })).catch(
      async res => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors);
      }
    )
  }

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={e => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="text"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && <p>{errors.credential}</p>}
        <button type="submit">Login</button>
      </form>
    </>
  )
}

export default LoginFormPage;