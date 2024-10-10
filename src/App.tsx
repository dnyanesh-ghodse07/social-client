import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import UserHome from "./pages/UserHome";
import ProtectedRoute from "./components/ProtectedRoute";
import PostDeatails from "./pages/PostDetails";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import CommunityPage from "./pages/CommunityPage";
import './App.css';
import Profile from "./pages/Profile";

function App() {
  const isLogin = useSelector(
    (state: RootState) => state?.auth?.isAuthenticated
  );
  return (
    <>
      <Router>
        <div className="max-w-4xl mx-auto">
        <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                isLogin ? <Navigate to="myspace" /> : <Navigate to="/login" />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/myspace"
              element={
                <ProtectedRoute>
                  <UserHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/profile/:userId"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="myspace/post/:postId"
              element={
                <ProtectedRoute>
                  <PostDeatails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/community"
              element={
                <ProtectedRoute>
                  <CommunityPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/community/post/:postId"
              element={
                <ProtectedRoute>
                  <PostDeatails />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
