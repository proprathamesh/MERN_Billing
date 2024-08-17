import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard'; // Example protected component
import Km from './components/Km';
import { MyProvider } from './context/context';
// import 'antd/dist/antd.min.css'; // Updated path for Ant Design styles

const App: React.FC = () => {
  return (
    <MyProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/km" element={<Km />} />
        </Routes>
      </Router>
    </MyProvider>
  );
};

export default App;
