import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authAction";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Credentials } from "../type";
import { AppDispatch } from "../app/store";

const Login = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await dispatch(loginUser(credentials));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/myspace");
    }
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-100px)]">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 pb-8 pt-4 px-6 shadow-md md:min-w-96"
      >
        <h2 className="text-2xl">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="p-2 border-[1px]"
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border-[1px]"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <button
          className="p-2 mt-1 mb-2 bg-cyan-800 text-slate-100"
          type="submit"
        >
          Login
        </button>
        <p className="text-sm">
          Don't have an account ?
          <Link className="text-blue-800 text-sm pl-1" to="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
