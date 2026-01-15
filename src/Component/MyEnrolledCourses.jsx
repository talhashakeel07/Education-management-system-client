import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyEnorolledCourses = () => {
    const [myData, setMyData] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const navigate = useNavigate(); 
    const userRole = localStorage.getItem('role'); 

    useEffect(() => {
        const fetchContent = async () => {
            const token = localStorage.getItem('token');
            const base = 'http://localhost:8000/api'; 

            if (!token) {
                setError("Aap logged in nahi hain. Please login karein.");
                setLoading(false);
                return;
            }

            try {
                const endpoint = userRole === 'teacher' 
                    ? `${base}/user/assigned-courses` 
                    : `${base}/user/my-enrollments`;

                const res = await axios.get(endpoint, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                console.log("Fetched Data:", res.data);
                setMyData(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Data load nahi ho sakay", err);
                setError(err.response?.data?.msg || "Data fetch karne mein masla hua.");
                setLoading(false);
            }
        };

        fetchContent();
    }, [userRole]);

    
    const handleGoToCourse = (courseId) => {
        if (!courseId) {
            alert("Course ID nahi mili!");
            return;
        }
        const path = userRole === 'teacher' ? `/teacher-course/${courseId}` : `/course-view/${courseId}`;
        navigate(path);
    };

    if (loading) return <div style={styles.container}><h2>Loading your dashboard...</h2></div>;
    if (error) return <div style={styles.container}><h2 style={{color: 'red'}}>{error}</h2></div>;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>
                    {userRole === 'teacher' ? "My Assigned Courses" : "My Learning Hall"}
                </h1>
                <p style={styles.subtitle}>
                    {myData.length > 0 
                        ? `You have ${myData.length} active ${userRole === 'teacher' ? 'teaching assignments' : 'enrollments'}.` 
                        : "No courses found at the moment."}
                </p>
            </div>

            <div style={styles.grid}>
                {myData.length > 0 ? (
                    myData.map((item) => {
                        const course = userRole === 'teacher' ? item : item.courseId;
                        const targetId = userRole === 'teacher' ? item._id : item.courseId?._id;

                        return (
                            <div key={item._id} style={styles.card}>
                                <div style={styles.statusBadge}>
                                    {userRole === 'teacher' ? 'Teaching' : 'Enrolled'}
                                </div>
                                
                                <h3 style={styles.courseName}>
                                    {course?.courseName || course?.title || "Untitled Course"}
                                </h3>
                                
                                <p style={styles.courseCode}>
                                    Code: {course?.courseCode || "N/A"}
                                </p>
                                
                                <div style={styles.infoSection}>
                                    <p style={styles.teacher}>
                                        {userRole === 'teacher' 
                                            ? <span><strong>Students:</strong> {course?.students?.length || 0} Registered</span>
                                            : <span><strong>Instructor:</strong> {course?.teacherName || "TBA"}</span>
                                        }
                                    </p>
                                </div>

                                <button 
                                    style={styles.viewBtn} 
                                    onClick={() => handleGoToCourse(targetId)}
                                >
                                    {userRole === 'teacher' ? "Manage Course" : "Go to Course"}
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <div style={styles.noData}>
                        <h3>{userRole === 'teacher' ? "Aapko koi course assign nahi kiya gaya." : "Aap ne enroll nahi kiya."}</h3>
                        {userRole !== 'teacher' && (
                             <button 
                                style={{...styles.viewBtn, width: '200px', marginTop: '20px', background: '#3498db'}}
                                onClick={() => navigate('/catalog')} 
                            >
                                Browse Courses
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '40px 5%', boxSizing: 'border-box', minHeight: '80vh', backgroundColor: '#fdfdfd' },
    header: { marginBottom: '40px', borderBottom: '2px solid #eee', paddingBottom: '20px' },
    title: { fontSize: '32px', fontWeight: 'bold', color: '#2c3e50', margin: 0 },
    subtitle: { color: '#7f8c8d', marginTop: '8px', fontSize: '16px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' },
    card: { background: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #f0f0f0', position: 'relative', transition: 'all 0.3s ease' },
    statusBadge: { position: 'absolute', top: '20px', right: '20px', background: '#e8f5e9', color: '#2e7d32', padding: '5px 15px', borderRadius: '30px', fontSize: '12px', fontWeight: 'bold' },
    courseName: { color: '#2c3e50', fontSize: '24px', margin: '15px 0 5px 0' },
    courseCode: { color: '#bdc3c7', fontSize: '14px', marginBottom: '25px', letterSpacing: '1px' },
    infoSection: { borderTop: '1px solid #f5f5f5', paddingTop: '20px', marginBottom: '25px' },
    teacher: { fontSize: '15px', color: '#34495e' },
    viewBtn: { width: '100%', padding: '14px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' },
    noData: { gridColumn: '1 / -1', textAlign: 'center', padding: '80px 20px', background: '#ffffff', border: '2px dashed #ddd', borderRadius: '20px', color: '#7f8c8d' }
};

export default MyEnorolledCourses;