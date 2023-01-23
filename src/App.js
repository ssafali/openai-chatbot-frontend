import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/auth.context";
import IsPrivate from './components/IsPrivate'
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import IsAnon from "./components/IsAnon";
import Gpt from "./pages/Gpt";
import DallE from "./components/DallE";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <div className="app h-screen w-screen">
      {!isLoggedIn && (
        <>
          <Navbar />
        </>
      )}
      <Routes>
        
        <Route
          path="/"
          element={
            <IsPrivate>
              <Gpt/>
            </IsPrivate>
          }
        />
        <Route
          path="/dall-e"
          element={
            <IsPrivate>
              <DallE/>
            </IsPrivate>
          }
        />

        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route
          path='*'
          element={
            <NotFoundPage/>
          }
        >

        </Route>
      </Routes>

    </div>
  );
}

export default App;
