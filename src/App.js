import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/auth.context";
import IsPrivate from './components/IsPrivate'
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import IsAnon from "./components/IsAnon";
import Gpt from "./pages/Gpt";
import DallE from "./pages/DallE";
import NotFoundPage from "./pages/NotFoundPage";
import Examples from "./components/Examples";

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div className="app h-screen w-screen overflow-x-hidden bg-[#101114]">
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
              <Gpt />
            </IsPrivate>
          }
        />
        <Route
          path="/dall-e"
          element={
            <IsPrivate>
              <DallE />
            </IsPrivate>
          }
        />

        <Route
          path="/examples"
          element={
            <IsPrivate>
              <Examples />
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
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>

    </div>
  );
}

export default App;
