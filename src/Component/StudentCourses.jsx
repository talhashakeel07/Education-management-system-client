import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const base = `${API_BASE}/api/user`;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${base}/all-courses`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCourses(res.data.courses || res.data);
      } catch (err) {
        console.error("Fetch error:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("Session expired. Please login again.");
        return;
      }

      const res = await axios.post(`${base}/enroll`, { courseId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      alert(res.data.msg || "Congratulations! You have successfully enrolled in this course.");
    } catch (err) {
      const errorMsg = err.response?.data?.msg || "Enrollment failed. Please try again later.";
      alert(errorMsg);
    }
  };

  if (loading) return <div style={loadingState}>Loading available courses...</div>;

  return (
    <div style={pageWrapper}>
      <div style={headerSection}>
        <h1 style={mainTitle}>Course Catalog</h1>
        <p style={subTitle}>Explore our top-rated courses and start your learning journey today.</p>
      </div>

      <div style={gridContainer}>
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course._id} style={courseCard}>
              <div style={badge}>Featured</div>
              <h3 style={courseTitle}>{course.title}</h3>
              <p style={courseCodeStyle}>Course Code: {course.courseCode}</p>
              <p style={descriptionStyle}>
                {course.description || "No description provided for this course yet."}
              </p>
              <div style={footerSection}>
                <button 
                  onClick={() => handleEnroll(course._id)} 
                  style={enrollBtn}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 15px rgba(49, 130, 206, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 12px rgba(49, 130, 206, 0.3)';
                  }}
                >
                  Enroll Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={emptyState}>No courses are currently available.</div>
        )}
      </div>
    </div>
  );
};


const pageWrapper = {
  padding: '60px 8%', 
  background: '#f8fafc',
  minHeight: '100vh',
  fontFamily: "'Inter', sans-serif"
};

const headerSection = {
  textAlign: 'center',
  marginBottom: '50px'
};

const mainTitle = {
  fontSize: '2.8rem',
  color: '#1e293b',
  marginBottom: '12px',
  fontWeight: '800',
  letterSpacing: '-0.02em'
};

const subTitle = {
  color: '#64748b',
  fontSize: '1.15rem',
  maxWidth: '600px',
  margin: '0 auto'
};

const gridContainer = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
  gap: '30px',
  maxWidth: '1300px',
  margin: '0 auto'
};

const courseCard = {
  background: '#ffffff',
  padding: '30px',
  borderRadius: '20px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid #f1f5f9',
  transition: 'all 0.3s ease'
};

const badge = {
  background: '#e0f2fe',
  color: '#0369a1',
  padding: '5px 14px',
  borderRadius: '30px',
  fontSize: '11px',
  fontWeight: '700',
  textTransform: 'uppercase',
  width: 'fit-content',
  marginBottom: '20px'
};

const courseTitle = {
  fontSize: '1.5rem',
  color: '#0f172a',
  marginBottom: '10px',
  fontWeight: '700'
};

const courseCodeStyle = {
  fontSize: '0.85rem',
  color: '#94a3b8',
  fontWeight: '600',
  textTransform: 'uppercase',
  marginBottom: '20px',
  letterSpacing: '0.05em'
};

const descriptionStyle = {
  fontSize: '0.95rem',
  color: '#475569',
  lineHeight: '1.7',
  marginBottom: '30px',
  flexGrow: 1
};

const footerSection = {
  borderTop: '1px solid #f1f5f9',
  paddingTop: '25px'
};

const enrollBtn = {
  width: '100%',
  background: '#2563eb',
  color: '#ffffff',
  border: 'none',
  padding: '14px',
  borderRadius: '12px',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: '700',
  transition: 'all 0.2s ease',
  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
};

const loadingState = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  fontSize: '1.2rem',
  fontWeight: '500',
  color: '#64748b'
};

const emptyState = {
  gridColumn: '1 / -1',
  textAlign: 'center',
  padding: '60px',
  background: '#fff',
  borderRadius: '20px',
  color: '#94a3b8',
  fontSize: '1.1rem'
};

export default StudentCourses;