import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/features/auth.slice";
import { useSignInUserMutation } from "../redux/api/auth";

type FieldType = {
  username: string;
  password: string;
};

const Login: React.FC = () => {
  const [signInUser] = useSignInUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    signInUser(values)
      .unwrap()
      .then((response) => {
        dispatch(
          login({
            access_token: response.token,
          })
        );
        navigate(`/`);
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="h-[100vh] flex flex-col justify-center items-center">
      <div className="w-[400px] px-10 shadow-2xl bg-gray-200 rounded-lg">
        <div className="text-3xl font-bold flex justify-center items-center p-3 my-5">
          Sign In
        </div>
        <Form
          name="basic"
          layout="vertical"
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" className="w-full mt-5">
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
