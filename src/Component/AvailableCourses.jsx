import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AvailableCourses = () => {
    const [courses, setCourses] = useState([]);
    const [enrolledIds, setEnrolledIds] = useState([]); 
    const [loading, setLoading] = useState(true);

    
    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                
                // ✅ Updated URL (all-courses)
                const coursesRes = await axios.get(`${API_BASE}/api/user/all-courses`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCourses(Array.isArray(coursesRes.data) ? coursesRes.data : coursesRes.data.courses);

                // ✅ Updated URL (my-enrollments)
                const enrollRes = await axios.get(`${API_BASE}/api/user/my-enrollments`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const myEnrollments = enrollRes.data || [];
                setEnrolledIds(myEnrollments.map(item => item.courseId?._id || item.courseId));
                
                setLoading(false);
            } catch (err) {
                console.error("Courses load nahi huay:", err);
                setLoading(false);
            }
        };
        fetchData();
    }, []); 
    const handleEnroll = async (courseId) => {
        try {
            const token = localStorage.getItem('token');
         
            const res = await axios.post(`${API_BASE}/api/user/enroll`, 
                { courseId }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert(res.data.msg || "Successfully Enrolled!");
            setEnrolledIds([...enrolledIds, courseId]); 
        } catch (err) {
            alert(err.response?.data?.msg || "Enrollment fail!");
        }
    };

    if (loading) return <div style={styles.loader}>Loading Catalog...</div>;

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.headerContainer}>
                <h2 style={styles.mainTitle}>Available Courses (Course Catalog)</h2>
                <div style={styles.underline}></div>
            </div>

            <div style={styles.grid}>
                {courses.length > 0 ? courses.map(course => {
                    const isAlreadyEnrolled = enrolledIds.includes(course._id);

                    return (
                        <div key={course._id} style={styles.card}>
                            <div style={styles.cardHeader}>
                                <h3 style={styles.titleText}>{course.title}</h3>
                            </div>
                            
                            <p style={styles.descText}>
                                {course.description || "Dive deep into industry-standard skills with our expert-led curriculum designed for your success."}
                            </p>

                            <div style={styles.footer}>
                                {isAlreadyEnrolled ? (
                                    <div style={styles.enrolledBadge}>✓ Enrolled</div>
                                ) : (
                                    <button 
                                        onClick={() => handleEnroll(course._id)} 
                                        style={styles.enrollBtn}
                                        onMouseOver={(e) => e.target.style.background = '#1e293b'}
                                        onMouseOut={(e) => e.target.style.background = '#2c3e50'}
                                    >
                                        Enroll Now
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                }) : <p style={styles.noData}>Abhi tak koi course add nahi kiya gaya.</p>}
            </div>
        </div>
    );
};

const styles = {
    pageWrapper: {
        padding: '40px 5%',
        background: '#f8fafc',
        minHeight: '100vh',
    },
    headerContainer: {
        textAlign: 'left',
        marginBottom: '40px',
    },
    mainTitle: {
        fontSize: '28px',
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: '10px'
    },
    underline: {
        width: '50px',
        height: '4px',
        background: '#2c3e50',
        borderRadius: '2px'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '25px',
    },
    card: {
        background: '#ffffff',
        borderRadius: '12px',
        padding: '25px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.2s ease'
    },
    cardHeader: {
        marginBottom: '15px'
    },
    titleText: {
        fontSize: '20px',
        color: '#0f172a',
        fontWeight: '700',
        margin: 0
    },
    descText: {
        color: '#475569',
        fontSize: '14.5px',
        lineHeight: '1.6',
        marginBottom: '25px',
        flexGrow: 1
    },
    footer: {
        marginTop: 'auto'
    },
    enrollBtn: {
        width: 'fit-content',
        backgroundColor: '#2c3e50', 
        color: 'white',
        padding: '10px 24px',
        border: 'none',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
    },
    enrolledBadge: {
        background: '#f1f5f9',
        color: '#64748b',
        padding: '10px 20px',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '600',
        textAlign: 'center',
        width: 'fit-content'
    },
    loader: { textAlign: 'center', padding: '100px', fontSize: '18px', color: '#64748b' },
    noData: { color: '#94a3b8', fontSize: '16px' }
};

export default AvailableCourses;