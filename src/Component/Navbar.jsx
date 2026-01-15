import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); 
  const userName = localStorage.getItem('userName'); 

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    window.location.reload();
  };

  const navStyle = { 
    width: '100%', height: '70px', padding: '0 5%', background: '#0f172a', color: '#fff', 
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'fixed', 
    top: '0', left: '0', zIndex: 1000, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' 
  };

  const brandStyle = { 
    fontFamily: 'Poppins, sans-serif', color: '#3b82f6', fontSize: '20px', fontWeight: '700', 
    textDecoration: 'none', letterSpacing: '-0.01em' 
  };

  const rightSideContainer = { display: 'flex', alignItems: 'center', gap: '24px' };

  const linkStyle = { 
    fontFamily: 'Inter, sans-serif', color: '#94a3b8', textDecoration: 'none', 
    fontSize: '14px', fontWeight: '500', transition: '0.2s', padding: '8px 12px' 
  };

  const logoutBtn = { 
    fontFamily: 'Inter, sans-serif', background: '#ef4444', color: 'white', border: 'none', 
    padding: '10px 18px', cursor: 'pointer', borderRadius: '8px', fontWeight: '600', fontSize: '13px'
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={brandStyle}>
        EMS <span style={{color:'#fff'}}>Portal</span>
      </Link>
      
      <div style={rightSideContainer}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {token && <Link to="/dashboard" style={linkStyle}>Dashboard</Link>}
          {token && userRole === 'admin' && (
            <>
              <Link to="/all-students" style={linkStyle}>Students</Link>
              <Link to="/all-teachers" style={linkStyle}>Teachers</Link>
              <Link to="/all-courses" style={linkStyle}>Courses</Link>
            </>
          )}
          {token && userRole === 'teacher' && <Link to="/all-courses" style={linkStyle}>My Courses</Link>}
        </div>

        {token ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderLeft: '1px solid #334155', paddingLeft: '20px' }}>
             <span style={{fontSize: '13px', fontWeight: '600', color: '#f1f5f9'}}>
                {userName} <span style={{color: '#64748b', fontWeight: '400'}}>({userRole})</span>
             </span>
             <button onClick={handleLogout} style={logoutBtn}>Logout</button>
          </div>
        ) : (
          <Link to="/login" style={{...linkStyle, background: '#3b82f6', color: '#fff', borderRadius: '8px'}}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;