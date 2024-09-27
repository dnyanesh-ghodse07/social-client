import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import UserHome from "./pages/UserHome";
import CreatePost from "./pages/CreatePost";
import ProtectedRoute from "./components/ProtectedRoute";
import PostDeatails from "./pages/PostDeatails";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import { useSelector } from "react-redux";

function App() {
  const isLogin = useSelector(state => state?.auth?.isAuthenticated);
  return (
    <>
      <Router>
        <Navbar />
        <div className="max-w-4xl mx-auto">

          <Routes>
            <Route path="/" element={isLogin ? <Navigate to='user-home'/> : <Navigate to='/login'/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/user-home"
              element={
                <ProtectedRoute>
                  <UserHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-post"
              element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              }
            />
            <Route
              path="/post/:postId"
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
