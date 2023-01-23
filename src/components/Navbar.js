import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  return (
    <nav className="z-50 flex flex-row justify-evenly gap-12 py-4 font-nunito underline-offset-4 decoration-2">
      {isLoggedIn && (
        <>
          <button className='fixed right-5 bottom-6 hover:underline rounded-md p-1 z-10' onClick={logOutUser}>Logout</button>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            {" "}
            <button className='hover:underline rounded-md p-1'>Sign Up</button>{" "}
          </Link>
          <Link to="/login">
            {" "}
            <button className='hover:underline rounded-md p-1'>Login</button>{" "}
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
