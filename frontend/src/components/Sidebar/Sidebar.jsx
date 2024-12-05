// // components/Sidebar.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';

// const Sidebar = () => {
//     return (
//         <div className="sidebar">
//             <ul>
//                 <li><Link to="/admin/products">Manage Products</Link></li>
//                 <li><Link to="/admin/users">Manage Users</Link></li>
//                 <li><Link to="/admin/statistics">Statistics</Link></li>
//             </ul>
//         </div>
//     );
// };

// export default Sidebar;

// components/sidebar/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-dark text-white vh-100 p-3 sidebar">
      <h2 className="text-center">Admin Menu</h2>
      <nav className="nav flex-column">
        <Link className="nav-link text-white" to="/admin/dashboard">
          <i className="bi bi-speedometer2"></i> Dashboard
        </Link>
        <Link className="nav-link text-white" to="/admin/settings">
          <i className="bi bi-gear"></i> Settings
        </Link>
        <Link className="nav-link text-white" to="/admin/users">
          <i className="bi bi-people"></i> Users
        </Link>
        <Link className="nav-link text-white" to="/admin/products">
          <i className="bi bi-box"></i> Products
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
