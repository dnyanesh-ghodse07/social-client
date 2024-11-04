import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import PostDeatails from "./pages/PostDetails";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import CommunityPage from "./pages/CommunityPage";
import "./App.css";
import Profile from "./pages/Profile";
import ChatRoom from "./pages/ChatRoom";
import ChatList from "./pages/ChatList";
import { SocketProvider } from "./SocketContext";
import socket from "./socket";
import { useEffect } from "react";

function App() {
  const auth = useSelector(
    (state: RootState) => state?.auth
  );
  const isLogin = auth.isAuthenticated;
  const userId = auth.userId;


  useEffect(() => {
    if (userId) {
      // Emit joinRoom with user ID to join the user's unique room
      socket.emit("joinRoom", userId);
    }

    console.log(userId)
  }, [userId]);

  
  return (
    <>
    
      <SocketProvider>
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
                path="/user/chat/:currentUserId/:selectedUserId"
                element={
                  <ProtectedRoute>
                    <ChatRoom />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/profile/:userId"
                element={
                  // <ProtectedRoute>
                  <Profile />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/user/chats/:userId"
                element={
                  <ProtectedRoute>
                    <ChatList />
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
              <Route path="/community" element={<CommunityPage />} />
              <Route
                path="/community/post/:postId"
                element={
                  // <ProtectedRoute>
                  <PostDeatails />
                  // </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </SocketProvider>
    </>
  );
}

export default App;
