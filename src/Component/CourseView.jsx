import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CourseView = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`http://localhost:8000/api/user/course/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCourse(res.data.course || res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching course:", err);
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    if (loading) return <div style={styles.loader}>Loading...</div>;
    if (!course) return <div style={styles.loader}>Course not found.</div>;

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.container}>
                <button onClick={() => navigate(-1)} style={styles.backBtn}>
                    ← Back to Dashboard
                </button>

                <div style={styles.contentCard}>
                    <div style={styles.headerSection}>
                        <h1 style={styles.courseTitle}>{course.title || course.courseName}</h1>
                        <span style={styles.codeBadge}>Code: {course.courseCode}</span>
                    </div>

                    <div style={styles.videoWrapper}>
                        <div style={styles.videoPlaceholder}>
                            <span style={styles.playIcon}>▶</span>
                            <p style={styles.videoText}>Course Content for {course.title}</p>
                        </div>
                    </div>

                    <div style={styles.detailsSection}>
                        <h3 style={styles.sectionTitle}>About this Course</h3>
                        <p style={styles.description}>
                            {course.description || "Welcome to your Education Manegment System dashboard. Here you can access all the lectures and resources for this specific course."}
                        </p>
                        
                        <div style={styles.instructorInfo}>
                            <span style={styles.insIcon}>👤</span>
                            <span style={styles.insName}>Instructor: <strong>{course.teacherName || 'TBA'}</strong></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    pageWrapper: {
        background: '#f8fafc', 
        minHeight: '100vh',
        padding: '20px'
    },
    container: {
        maxWidth: '1000px',
        margin: '0 auto',
    },
    backBtn: {
        background: 'none',
        border: 'none',
        color: '#64748b',
        cursor: 'pointer',
        fontWeight: '600',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
    },
    contentCard: {
        background: '#ffffff',
        borderRadius: '20px', 
        padding: '40px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
        border: '1px solid #f0f0f0'
    },
    headerSection: {
        marginBottom: '30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    courseTitle: {
        fontSize: '32px',
        fontWeight: '700',
        color: '#2c3e50',
        margin: 0
    },
    codeBadge: {
        background: '#eef2ff',
        color: '#4f46e5',
        padding: '6px 15px',
        borderRadius: '30px',
        fontSize: '13px',
        fontWeight: 'bold'
    },
    videoWrapper: {
        width: '100%',
        marginBottom: '35px'
    },
    videoPlaceholder: {
        width: '100%',
        height: '450px',
        background: '#1e293b', 
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff'
    },
    playIcon: {
        fontSize: '50px',
        marginBottom: '10px',
        opacity: '0.8'
    },
    videoText: {
        fontSize: '16px',
        fontWeight: '500'
    },
    detailsSection: {
        borderTop: '1px solid #f1f5f9',
        paddingTop: '30px'
    },
    sectionTitle: {
        fontSize: '22px',
        color: '#1e293b',
        marginBottom: '15px'
    },
    description: {
        color: '#475569',
        fontSize: '16px',
        lineHeight: '1.7',
        marginBottom: '25px'
    },
    instructorInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        color: '#64748b',
        background: '#f8fafc',
        padding: '15px 20px',
        borderRadius: '12px',
        width: 'fit-content'
    },
    insIcon: { fontSize: '18px' },
    insName: { fontSize: '15px' },
    loader: {
        textAlign: 'center',
        marginTop: '100px',
        fontSize: '18px',
        color: '#64748b'
    }
};

export default CourseView;