import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../features/auth/authAction";
import { Link } from "react-router-dom";
import { AppDispatch } from "../app/store";
import { Credentials } from "../type";
import { Button, Input } from "antd";

const Register = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await dispatch(registerUser(credentials));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/user-home");
    }
  };
  return (
    <div className="flex justify-center items-center h-[calc(100vh-100px)]">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 pb-8 pt-4 px-6 border-[1px] md:min-w-96"
      >
        <h2 className="text-2xl">Register</h2>
        <Input
          type="text"
          placeholder="Username"
          className="p-2 border-[1px] outline-none"
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
        />
        <Input
          type="email"
          placeholder="Email"
          className="p-2 border-[1px] outline-none"
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />
        <Input
          type="password"
          placeholder="Password"
          className="p-2 border-[1px] outline-none"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <Button htmlType="submit" variant="solid" color="primary" className="p-2 mt-2">Signup</Button>
        <p className="text-sm">
          Already have an account ?
          <Link className="text-blue-800" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
