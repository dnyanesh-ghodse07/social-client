import { useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authAction";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Dropdown, MenuProps } from "antd";
import { IoPersonSharp } from "react-icons/io5";
import { VscAccount, VscMail, VscSignOut } from "react-icons/vsc";
import { CgFeed } from "react-icons/cg";
import { BiLogIn } from "react-icons/bi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state?.auth?.isAuthenticated
  );

  const userId = useSelector((state: RootState) => state?.auth?.userId);
  // const username = useSelector((state: RootState) => state?.auth?.username);
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const items: MenuProps["items"] = [
    {
      label: "Profile",
      key: "1",
      onClick: () => {
        navigate(`/user/profile/${userId}`);
      },
      icon: <VscAccount />,
    },
    {
      label: "Logout",
      key: "4",
      onClick: handleLogout,
      icon: <VscSignOut />,
    },
  ];

  return (
    <div className="z-50 flex justify-between border-b-2 items-center py-2 px-4 sticky top-0 bg-white">
      <div className="flex gap-1 items-center">
        <img width={50} src="/logo_no_bg.png" alt="" />
        <h2 className="text-2xl font-bold text-cyan-700">Social</h2>
      </div>
      <div className="flex items-center gap-2">
        <Button type="link" size="small" shape="circle">
          <NavLink
            className="text-cyan-600 flex items-center justify-center gap-1"
            to="/community"
          >
            <CgFeed size={24} />
            <span className="hidden md:block">Community</span>
          </NavLink>
        </Button>
        {!isAuthenticated && (
          <Button type="link" size="small" shape="circle">
            <Link
              to="/login"
              className="flex items-center justify-center text-cyan-700"
            >
              <span className="hidden md:block"> Login</span>
              <BiLogIn size={24} />
            </Link>
          </Button>
        )}
        {isAuthenticated && (
          <Button type="link" size="small" shape="circle">
            <NavLink
              className="text-cyan-600 cursor-pointer"
              to={`/user/chats/${userId}`}
            >
              <VscMail size={24} />
            </NavLink>
          </Button>
        )}
        <div>
          {isAuthenticated && (
            <Dropdown menu={{ items }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Button size="small" type="primary" shape="circle" className="">
                  <IoPersonSharp />
                </Button>
              </a>
            </Dropdown>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
