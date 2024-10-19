import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authAction";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Credentials } from "../type";
import { AppDispatch } from "../app/store";
import { Button, Input, message } from "antd";

const Login = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const result = await dispatch(loginUser(credentials));
    setLoading(false);
    if (result.meta.requestStatus === "fulfilled") {
      const payload = result.payload as { userId: string };
      navigate(`/user/profile/${payload.userId as string}`);
    }

    if (result.meta.requestStatus === "rejected") {
      messageApi.open({
        type: "error",
        content: "Invalid credentials",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-100px)]">
      {contextHolder}
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 pb-8 pt-4 px-6 shadow-md md:min-w-96"
      >
        <h2 className="text-2xl">Login</h2>
        <Input
          type="email"
          placeholder="Email"
          className="p-2 border-[1px] text-[16px]"
          required
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />
        <Input
          type="password"
          required
          placeholder="Password"
          className="p-2 border-[1px] text-[16px]"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <Button
          size="large"
          loading={loading}
          className="p-2 mt-1 mb-2 text-[16px]"
          variant="solid"
          color="primary"
          htmlType="submit"
        >
          Login
        </Button>
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
