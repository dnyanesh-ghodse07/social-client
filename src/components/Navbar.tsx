import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authAction";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated);

  const handleLogout = () => {
    dispatch(logoutUser());
  }

  return (
    <div className="flex justify-between p-4 shadow-md sticky top-0 w-screen bg-slate-100">
      <div>
        <h2 className="text-2xl font-bold text-cyan-700">Social</h2>
      </div>
      <div>
        {isAuthenticated ? (
          <button onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
