import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TeacherCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

    useEffect(() => {
        const fetchAssignedCourses = async () => {
            try {
                const token = localStorage.getItem('token');
                
                const res = await axios.get(`${API_BASE}/api/user/assigned-courses`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCourses(res.data.courses || res.data);
                setLoading(false);
            } catch (err) {
                console.error("Teacher courses error:", err);
                setLoading(false);
            }
        };
        fetchAssignedCourses();
    }, []); 

    if (loading) return <div style={styles.loader}>Loading Assigned Courses...</div>;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>My Assigned Courses</h1>
                <p style={styles.subtitle}>Teaching Dashboard</p>
            </div>

            <div style={styles.grid}>
                {courses.length > 0 ? courses.map((course) => (
                    <div key={course._id} style={styles.card}>
                        <div style={styles.badge}>Teaching</div>
                        <h3 style={styles.courseName}>{course.title || course.courseName}</h3>
                        <p style={styles.courseCode}>Code: {course.courseCode}</p>
                        
                        <div style={styles.stats}>
                            <span><strong>Students:</strong> {course.students?.length || 0} enrolled</span>
                        </div>

                        <button 
                            style={styles.manageBtn}
                            onClick={() => navigate(`/teacher-course-panel/${course._id}`)}
                        >
                            Manage Course
                        </button>
                    </div>
                )) : (
                    <div style={styles.noData}>Aapko abhi tak koi course assign nahi hua.</div>
                )}
            </div>
        </div>
    );
};

// --- Your Original Modern CSS Kept Exactly As It Was ---
const styles = {
    container: { padding: '40px 5%', background: '#f8fafc', minHeight: '100vh' },
    header: { marginBottom: '30px' },
    title: { fontSize: '30px', color: '#1e293b', fontWeight: 'bold', margin: 0 },
    subtitle: { color: '#64748b', marginTop: '5px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' },
    card: { background: '#fff', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', position: 'relative', border: '1px solid #f0f0f0' },
    badge: { position: 'absolute', top: '15px', right: '15px', background: '#ecfdf5', color: '#059669', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' },
    courseName: { fontSize: '22px', color: '#1e293b', margin: '10px 0' },
    courseCode: { color: '#94a3b8', fontSize: '14px', marginBottom: '20px' },
    stats: { borderTop: '1px solid #f1f5f9', paddingTop: '15px', marginBottom: '20px', color: '#475569' },
    manageBtn: { width: '100%', padding: '12px', background: '#2c3e50', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
    loader: { textAlign: 'center', marginTop: '50px', fontSize: '18px' },
    noData: { textAlign: 'center', gridColumn: '1/-1', padding: '50px', color: '#94a3b8' }
};

export default TeacherCourses;