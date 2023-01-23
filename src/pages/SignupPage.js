import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };

    // Send a request to the server using axios
    /* 
    const authToken = localStorage.getItem("authToken");
    axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/signup`, 
      requestBody, 
      { headers: { Authorization: `Bearer ${authToken}` },
    })
    .then((response) => {})
    */

    // Or using a service
    authService
      .signup(requestBody)
      .then((response) => {
        // If the POST request is successful redirect to the login page
        navigate("/login");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="flex flex-col h-[80vh] w-screen items-center mt-12 gap-3 font-nunito">
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit} className='flex flex-col gap-2 items-center'>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} className='text-black p-1 rounded-md text-center outline-none font-semibold'/>

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
          className='text-black p-1 rounded-md text-center outline-none font-semibold'
        />

        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={handleName} className='text-black p-1 rounded-md text-center outline-none font-semibold'/>

        <button type="submit" className='hover:underline'>Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to={"/login"} className='hover:underline'> Login</Link>
    </div>
  );
}

export default SignupPage;
