import { useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authAction";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { NavLink, useNavigate } from "react-router-dom";
import { Dropdown, MenuProps, Space } from "antd";
import { IoPersonSharp } from "react-icons/io5";

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
    },
    {
      label: "Messages",
      key: "2",
      onClick: () => {
        navigate(`/user/chats/${userId}`);
      },
    },
    {
      label: "My Space",
      key: "3",
      onClick: () => {
        navigate(`/myspace`);
      },
    },
    {
      label: "Logout",
      key: "4",
      onClick: handleLogout,
    },
  ];

 
  return (
    <div className="z-50 flex justify-between border-b-2 items-center py-2 px-4 sticky top-0 bg-white">
      <div className="flex gap-1 items-center">
        <img width={50} src="/logo_no_bg.png" alt="" />
        <h2 className="text-2xl font-bold text-cyan-700">Social</h2>
      </div>
      <div className="flex items-center gap-4">
        <NavLink className="text-cyan-600" to="/community">
          Community
        </NavLink>
        <div>
          {isAuthenticated && (
            <Dropdown menu={{ items }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Space className="border p-2 rounded-full bg-slate-600 text-slate-50 cursor-pointer">
                  <IoPersonSharp />
                </Space>
              </a>
            </Dropdown>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
