import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useNavigate } from "react-router-dom";

const useNavigateToLogin = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleNavigate = () => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  };
  return handleNavigate;
};

export default useNavigateToLogin;
