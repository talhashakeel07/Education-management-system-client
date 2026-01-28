import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CourseCatalog = () => {
    const [courses, setCourses] = useState([]);
    const [enrolledIds, setEnrolledIds] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [notif, setNotif] = useState({ show: false, msg: '', type: '' });
    
    const navigate = useNavigate();

    // ✅ Render URL Setup
    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

    const showNotification = (msg, type = 'success') => {
        setNotif({ show: true, msg, type });
        setTimeout(() => setNotif({ show: false, msg: '', type: '' }), 3500);
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const token = localStorage.getItem('token');
                
                // ✅ Updated URL (all-courses)
                const res = await axios.get(`${API_BASE}/api/user/all-courses`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = res.data.courses || res.data;
                setCourses(Array.isArray(data) ? data : []);

                // ✅ Updated URL (my-courses)
                const enrolledRes = await axios.get(`${API_BASE}/api/user/my-courses`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const myCourses = enrolledRes.data.courses || enrolledRes.data;
                setEnrolledIds(myCourses.map(c => c._id));

                setLoading(false);
            } catch (err) {
                console.error(err);
                showNotification("Error loading data.", "error");
                setLoading(false);
            }
        };
        fetchInitialData();
    }, []);

    const handleEnroll = async (courseId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                showNotification("Please login to enroll.", "error");
                return;
            }
            // ✅ Updated URL (enroll)
            const res = await axios.post(`${API_BASE}/api/user/enroll`, 
                { courseId }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            showNotification(res.data.msg || "Successfully enrolled!");
            setEnrolledIds([...enrolledIds, courseId]); 
        } catch (err) {
            showNotification(err.response?.data?.msg || "Enrollment failed.", "error");
        }
    };

    if (loading) return <div style={styles.loader}>Loading Academic Catalog...</div>;

    return (
        <div style={styles.pageWrapper}>
            {notif.show && (
                <div style={{ ...styles.notification, backgroundColor: notif.type === 'error' ? '#ef4444' : '#10b981' }}>
                    {notif.msg}
                </div>
            )}

            <div style={styles.headerContainer}>
                <h2 style={styles.mainTitle}>Course Catalog</h2>
                <div style={styles.underline}></div>
                <p style={styles.subText}>Start your learning journey by selecting a course.</p>
            </div>
            
            <div style={styles.grid}>
                {courses.length > 0 ? (
                    courses.map((course) => {
                        const isEnrolled = enrolledIds.includes(course._id);
                        
                        return (
                            <div key={course._id} style={styles.card}>
                                <div style={styles.badgeRow}>
                                    <span style={styles.codeBadge}>{course.courseCode}</span>
                                    {isEnrolled && <span style={styles.enrolledLabel}>Enrolled</span>}
                                </div>
                                
                                <h3 style={styles.titleText}>{course.title}</h3>
                                <p style={styles.descText}>{course.description || "Course details will be available soon."}</p>
                                
                                <div style={styles.footerInfo}>
                                    <div style={styles.instructorSection}>
                                        <span style={styles.insIcon}>👤</span>
                                        <span style={styles.insName}>{course.teacherName || 'TBA'}</span>
                                    </div>

                                    {isEnrolled ? (
                                        <button 
                                            onClick={() => navigate(`/course-view/${course._id}`)} 
                                            style={styles.goBtn}
                                        >
                                            Go to Course
                                        </button>
                                    ) : (
                                        <button 
                                            onClick={() => handleEnroll(course._id)} 
                                            style={styles.enrollBtn}
                                            onMouseOver={(e) => e.target.style.background = '#1e40af'}
                                            onMouseOut={(e) => e.target.style.background = '#2563eb'}
                                        >
                                            Enroll Now
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div style={styles.noData}>No courses available.</div>
                )}
            </div>
        </div>
    );
};

const styles = {
    pageWrapper: { padding: '20px 5%', background: '#f8fafc', minHeight: '80vh' },
    headerContainer: { textAlign: 'center', marginBottom: '40px' },
    mainTitle: { fontSize: '32px', fontWeight: '800', color: '#1e293b' },
    underline: { width: '60px', height: '4px', background: '#2563eb', margin: '0 auto 15px' },
    subText: { color: '#64748b', fontSize: '16px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px', maxWidth: '1200px', margin: '0 auto' },
    card: { background: '#ffffff', borderRadius: '16px', padding: '25px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08)', display: 'flex', flexDirection: 'column', border: '1px solid #e2e8f0' },
    badgeRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '15px' },
    codeBadge: { background: '#eff6ff', color: '#2563eb', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' },
    enrolledLabel: { background: '#dcfce7', color: '#16a34a', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' },
    titleText: { fontSize: '19px', color: '#0f172a', fontWeight: '700', marginBottom: '12px' },
    descText: { color: '#475569', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px', flexGrow: 1 },
    footerInfo: { borderTop: '1px solid #f1f5f9', paddingTop: '15px' },
    instructorSection: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' },
    insName: { fontSize: '14px', color: '#1e293b', fontWeight: '600' },
    enrollBtn: { width: '100%', background: '#2563eb', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', cursor: 'pointer', fontWeight: '700' },
    goBtn: { width: '100%', background: '#16a34a', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', cursor: 'pointer', fontWeight: '700' },
    notification: { position: 'fixed', top: '30px', right: '30px', padding: '16px 32px', borderRadius: '12px', color: 'white', fontWeight: '600', zIndex: 9999 },
    loader: { textAlign: 'center', padding: '100px', fontSize: '18px' }
};

export default CourseCatalog;