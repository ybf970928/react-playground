import React from "react";
import { Button, Form, Input, Card, message } from 'antd';
import useSWRMutation from 'swr/mutation'
import request from "src/utils/request";

interface LoginTypes {
  username: string;
  password: string
}
const fetchLogin = async (url: string, { arg }: { arg: LoginTypes }) => {
  const res = await request.post(url, { ...arg })
  return res.data
}

const Login: React.FC = () => {

  const { trigger, isMutating } = useSWRMutation('/login', fetchLogin)

  const onFinish = async (values: LoginTypes) => {
    try {
      const res = await trigger(values)
      localStorage.setItem("token", res.token)
      message.success("succ")
    } catch (error: any) {
      message.error(error.msg)
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Card>
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={isMutating}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default Login