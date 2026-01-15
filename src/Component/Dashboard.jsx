import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const userRole = localStorage.getItem('role') || "";

  // Helper Icon Component
  const Icon = ({ children, color }) => (
    <svg 
      width="45" 
      height="45" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ marginBottom: '20px' }}
    >
      {children}
    </svg>
  );

  return (
    <div className="page-wrapper" style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>
          Welcome to {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard
        </h1>
        <p style={styles.subtitle}>EMS Management Portal — Manage your activities below</p>
      </div>
      
      <div style={styles.grid}>
        
        {/* --- ADMIN VIEW --- */}
        {userRole === 'admin' && (
          <>
            <div style={styles.card}>
              <Icon color="#3b82f6">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </Icon>
              <h2 style={styles.cardTitle}>Student Management</h2>
              <Link to="/all-students" style={styles.btnPrimary}>View All Students</Link>
              <Link to="/student-add" style={styles.btnSuccess}>Add New Student</Link>
            </div>

            <div style={styles.card}>
              <Icon color="#8b5cf6">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </Icon>
              <h2 style={styles.cardTitle}>Teacher Management</h2>
              <Link to="/all-teachers" style={styles.btnPrimary}>View All Teachers</Link>
              <Link to="/teacher-add" style={styles.btnSuccess}>Add New Teacher</Link>
            </div>

            <div style={styles.card}>
              <Icon color="#f59e0b">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z" />
              </Icon>
              <h2 style={styles.cardTitle}>Course Management</h2>
              <Link to="/all-courses" style={styles.btnPrimary}>Manage Courses</Link>
              <Link to="/course-add" style={styles.btnSuccess}>Create New Course</Link>
            </div>
          </>
        )}

        {/* --- TEACHER VIEW --- */}
        {userRole === 'teacher' && (
          <>
            <div style={styles.card}>
              <Icon color="#10b981">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </Icon>
              <h2 style={styles.cardTitle}>My Classes</h2>
              <p style={styles.cardText}>View and manage courses assigned to you</p>
              <Link to="/all-courses" style={styles.btnPrimary}>View My Courses</Link>
            </div>
            <div style={styles.card}>
              <Icon color="#475569">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </Icon>
              <h2 style={styles.cardTitle}>Student Records</h2>
              <p style={styles.cardText}>Access registered student information</p>
              <Link to="/all-students" style={styles.btnPrimary}>View Students</Link>
            </div>
          </>
        )}

        {/* --- STUDENT VIEW --- */}
        {userRole === 'student' && (
          <>
            <div style={styles.card}>
              <Icon color="#ef4444">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </Icon>
              <h2 style={styles.cardTitle}>Course Catalog</h2>
              <p style={styles.cardText}>Explore our diverse range of subjects and enroll now.</p>
              <Link to="/available-courses" style={styles.btnPrimary}>Browse Courses</Link>
            </div>
            <div style={styles.card}>
              <Icon color="#14b8a6">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </Icon>
              <h2 style={styles.cardTitle}>My Study Hall</h2>
              <p style={styles.cardText}>Access your enrolled subjects and track your goals.</p>
              <Link to="/my-courses" style={styles.btnPrimary}>My Enrolled Courses</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// --- MODERN STYLES (Kept at the bottom as requested) ---
const styles = {
  container: { 
    padding: '60px 10%', 
    width: '100%', 
    boxSizing: 'border-box', 
    minHeight: '90vh', 
    background: '#f8fafc' 
  },
  header: { 
    textAlign: 'left', 
    marginBottom: '50px', 
    paddingBottom: '20px' 
  },
  title: { 
    fontFamily: 'Poppins, sans-serif', 
    fontSize: '36px', 
    color: '#0f172a', 
    fontWeight: '700', 
    letterSpacing: '-0.02em',
    margin: 0
  },
  subtitle: { 
    color: '#64748b', 
    margin: '8px 0 0 0', 
    fontSize: '18px', 
    fontWeight: '400' 
  },
  grid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
    gap: '32px' 
  },
  card: { 
    background: '#fff', 
    padding: '40px', 
    borderRadius: '24px', 
    textAlign: 'center', 
    boxShadow: '0 4px 20px rgba(0,0,0,0.03)', 
    border: '1px solid #f1f5f9', 
    transition: 'transform 0.2s ease-in-out', 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center' 
  },
  cardTitle: { 
    fontFamily: 'Poppins, sans-serif', 
    color: '#1e293b', 
    fontSize: '20px', 
    marginBottom: '12px', 
    fontWeight: '600' 
  },
  cardText: { 
    color: '#64748b', 
    fontSize: '15px', 
    marginBottom: '24px', 
    lineHeight: '1.6' 
  },
  btnPrimary: { 
    display: 'block', 
    width: '100%', 
    padding: '14px', 
    backgroundColor: '#3b82f6', 
    color: 'white', 
    textDecoration: 'none', 
    borderRadius: '12px', 
    fontWeight: '600', 
    fontSize: '14px', 
    marginBottom: '8px',
    textAlign: 'center'
  },
  btnSuccess: { 
    display: 'block', 
    width: '100%', 
    padding: '14px', 
    backgroundColor: '#10b981', 
    color: 'white', 
    textDecoration: 'none', 
    borderRadius: '12px', 
    fontWeight: '600', 
    fontSize: '14px',
    textAlign: 'center'
  }
};

export default Dashboard;