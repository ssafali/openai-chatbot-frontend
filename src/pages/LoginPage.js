import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.service";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    // Send a request to the server using axios
    /* 
    axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`)
      .then((response) => {})
    */

    // Or using a service
    authService
      .login(requestBody)
      .then((response) => {
        // If the POST request is successful store the authentication token,
        // after the token is stored authenticate the user
        // and at last navigate to the home page
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="flex flex-col h-[80vh] w-screen items-center mt-12 gap-3 font-nunito">
      <h1>Login</h1>

      <form onSubmit={handleLoginSubmit} className='flex flex-col gap-2 items-center'>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} className='text-black p-1 rounded-md text-center outline-none font-semibold'/>

        <label>Password:</label>
        <input
          className='p-1 rounded-md text-center outline-none font-semibold text-black'
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <button type="submit" className='hover:underline'>Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Don't have an account yet?</p>
      <Link to={"/signup"} className='hover:underline'> Sign Up</Link>
    </div>
  );
}

export default LoginPage;
