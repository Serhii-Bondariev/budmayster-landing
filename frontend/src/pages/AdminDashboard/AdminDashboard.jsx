// components/AdminPanel.jsx
import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
// import Navbar from '../../components/Navbar/Navbar';

const AdminDashboard = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 bg-light">
        {/* <Navbar /> */}
        <div className="container py-4">
          <h1>Welcome to the Admin Panel</h1>
          {/* В залежності від маршруту тут може бути контент */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
