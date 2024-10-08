import { useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authAction";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(
    (state: RootState) => state?.auth?.isAuthenticated
  );

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="z-50 flex justify-between items-center p-4 shadow-md sticky top-0 w-screen bg-slate-100">
      <div className="flex gap-1 items-center">
        <img width={50} src="/logo_no_bg.png" alt="" />
        <h2 className="text-2xl font-bold text-cyan-700">Social</h2>
      </div>
      <div className="flex gap-2">
        <NavLink className="font-semibold text-cyan-600" to="/community">
          Community
        </NavLink>
        <NavLink className="font-semibold text-cyan-600" to="/myspace">
          My Space
        </NavLink>
      </div>
      <div>
        {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
      </div>
    </div>
  );
};

export default Navbar;
