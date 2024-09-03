import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Tabs, Card, message, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Context } from "../context/context";

const { TabPane } = Tabs;

const Auth: React.FC = () => {

  const navigate = useNavigate();
  const { defaultUrl } = Context();

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList.slice(-1);
  };

  const handleFileChange = (file: any) => {
    const isFileSizeValid = file.size / 1024 / 1024 < 1; // Check if file is less than 1MB
    if (!isFileSizeValid) {
      message.error('File must be smaller than 1MB!');
    }
    return isFileSizeValid;
  };

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
    profilePicture: any;
    companyName: string;
    address: string;
  }) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('username', values.username);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('mobile', values.mobile);
    formData.append('companyName', values.companyName);
    formData.append('address', values.address);
  
    if (values.profilePicture.length > 0) {
      formData.append('profilePicture', values.profilePicture[0].originFileObj);
    }
  
    try {
      await axios.post(`${defaultUrl}/api/profile/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      message.success('Registration successful! Please login.');
    } catch (error: any) {
      // Extracting message from error object
      const errorMessage = error.response?.data?.message || 'Registration failed!';
      console.log(error)
      message.error(errorMessage);
    } finally {
      setLoading(false);
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
            <Form.Item name="profilePicture" label="Profile Picture" valuePropName="fileList" getValueFromEvent={normFile}>
              <Upload name='profilePicture' maxCount={1} beforeUpload={handleFileChange} listType="picture-card" customRequest={({ file, onSuccess }) => {
                  // Handle the custom upload request here
                  // This is a placeholder for actual upload logic
                  setTimeout(() => onSuccess && onSuccess(file), 0);
                }}>
                <button style={{ border: 0, background: 'none' }} type="button">
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              </Upload>
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
