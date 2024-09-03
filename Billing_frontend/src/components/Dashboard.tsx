import React from 'react';
import { Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    message.success('Logout successful!');
    navigate('/auth');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>
      <Button type="primary" onClick={logout}>
        Logout
      </Button>
    </div>
  );
};

export default Dashboard;
