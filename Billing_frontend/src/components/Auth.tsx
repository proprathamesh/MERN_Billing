import React, { useState } from 'react';
import { Form, Input, Button, Tabs, Card, message } from 'antd';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import { Context } from "../context/context";

const { TabPane } = Tabs;

const Auth: React.FC = () => {

  const navigate = useNavigate();
  const { defaultUrl } = Context();

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onLoginFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    console.log(values)
    try {
      const response = await axios.post(`${defaultUrl}/api/profile/login`, values);
      localStorage.setItem('token', response.data.token);
      message.success('Login successful!');
      navigate('/Km');
      // Redirect to a protected page or dashboard
    } catch (error: any) {
      message.error(error.response.data.message || 'Login failed!');
    } finally {
      setLoading(false);
    }
  };

  const onRegisterFinish = async (values: {
    username: string;
    email: string;
    password: string;
    mobile: string;
    profilePicture: string;
    companyName: string;
    address: string;
  }) => {
    setLoading(true);
    try {
      await axios.post(`${defaultUrl}/api/profile/register`, values);
      message.success('Registration successful! Please login.');
    } catch (error: any) {
      message.error(error.response.data.message || 'Registration failed!');
    } finally {
      setLoading(false);
      form.resetFields();
    }
  };

  return (
    <Card title="BillGenie" style={{ width: 400, margin: '0 auto', marginTop: '100px' }}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Login" key="1">
          <Form name="login" initialValues={{ remember: true }} onFinish={onLoginFinish}>
            <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Login
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="Register" key="2">
          <Form form={form} name="register" onFinish={onRegisterFinish}>
            <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item name="mobile" rules={[{ required: true, message: 'Please input your mobile number!' }]}>
              <Input placeholder="Mobile" />
            </Form.Item>
            <Form.Item name="profilePicture">
              <Input placeholder="Profile Picture URL" />
            </Form.Item>
            <Form.Item name="companyName" rules={[{ required: true, message: 'Please input your company name!' }]}>
              <Input placeholder="Company Name" />
            </Form.Item>
            <Form.Item name="address" rules={[{ required: true, message: 'Please input your address!' }]}>
              <Input placeholder="Address" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Register
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default Auth;
