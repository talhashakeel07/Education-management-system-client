import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [assigningId, setAssigningId] = useState(null); 
    const navigate = useNavigate();
    
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role'); 
    const base = 'http://localhost:8000/api/user';

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const headers = { Authorization: `Bearer ${token}` };
            
            const endpoint = userRole === 'teacher' 
                ? `${base}/assigned-courses` 
                : `${base}/admin/all-courses`;

            const courseRes = await axios.get(endpoint, { headers });
            
            const allCourses = courseRes.data.courses || courseRes.data || [];
            setCourses(Array.isArray(allCourses) ? allCourses : []);

            if (userRole === 'admin') {
                const teacherRes = await axios.get(`${base}/all-teachers`, { headers });
                setTeachers(teacherRes.data.teachers || teacherRes.data || []);
            }
            
            setLoading(false);
        } catch (err) {
            console.error("Fetch failed", err);
            setLoading(false);
        }
    };

    const handleDelete = async (courseId) => {
        if (window.confirm("Are you sure?")) {
            try {
                await axios.delete(`${base}/delete-course/${courseId}`, { headers: { Authorization: `Bearer ${token}` } });
                setCourses(courses.filter(c => c._id !== courseId));
            } catch (err) { alert("Delete failed!"); }
        }
    };

    const handleAssign = async (courseId, teacherName) => {
        setAssigningId(courseId);
        try {
            await axios.put(`${base}/assign-teacher`, 
                { courseId, teacherName },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCourses(courses.map(c => c._id === courseId ? { ...c, teacherName: teacherName } : c));
            alert(`Assigned to ${teacherName}`);
        } catch (err) { alert("Assignment failed!"); }
        finally { setAssigningId(null); }
    };

    if (loading) return <div style={styles.loader}>Loading Academic Portal...</div>;

    return (
        <div style={styles.container}>
            <div style={styles.headerSection}>
                <div>
                    <h1 style={styles.title}>{userRole === 'teacher' ? "My Assigned Courses" : "Course Management"}</h1>
                    <p style={styles.subtitle}>{userRole === 'teacher' ? "Teaching Dashboard" : `Total Courses Active: ${courses.length}`}</p>
                </div>
                {userRole === 'admin' && (
                    <button onClick={() => navigate('/course-add')} style={styles.addBtn}>+ Add Course</button>
                )}
            </div>

            <div style={styles.cardGrid}>
                {courses.length > 0 ? courses.map(course => (
                    <div key={course._id} style={styles.card}>
                        <div style={styles.cardHeader}>
                            <span style={styles.codeBadge}>{course.courseCode}</span>
                            {userRole === 'admin' && (
                                <div style={styles.actionGroup}>
                                    <button onClick={() => navigate(`/course-edit/${course._id}`)} style={styles.editBtn}>✎</button>
                                    <button onClick={() => handleDelete(course._id)} style={styles.deleteBtn}>🗑</button>
                                </div>
                            )}
                        </div>
                        
                        <h3 style={styles.courseTitle}>{course.title}</h3>
                        <p style={styles.descriptionText}>{course.description || "No description provided."}</p>
                        
                        <div style={styles.facultyBox}>
                            <label style={styles.label}>Instructor</label>
                            {userRole === 'admin' ? (
                                <select 
                                    value={course.teacherName || ""}
                                    onChange={(e) => handleAssign(course._id, e.target.value)}
                                    style={styles.select}
                                    disabled={assigningId === course._id}
                                >
                                    <option value="" disabled>Select Teacher</option>
                                    {teachers.map(t => <option key={t._id} value={t.name}>{t.name}</option>)}
                                </select>
                            ) : (
                                <div style={styles.teacherRow}>
                                    <p style={{fontWeight: '700'}}>{course.teacherName}</p>
                                    <button onClick={() => navigate(`/course-view/${course._id}`)} style={styles.viewBtn}>View</button>
                                </div>
                            )}
                        </div>
                    </div>
                )) : <div style={{gridColumn: '1/-1', textAlign: 'center', padding: '50px'}}>No courses assigned yet.</div>}
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '40px 5%', background: '#f8fafc', minHeight: '100vh' },
    headerSection: { display: 'flex', justifyContent: 'space-between', marginBottom: '40px' },
    title: { fontSize: '28px', color: '#1e293b', fontWeight: '800' },
    subtitle: { color: '#64748b' },
    addBtn: { background: '#2563eb', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '10px', cursor: 'pointer', fontWeight: '700' },
    cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' },
    card: { background: '#fff', borderRadius: '15px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
    cardHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '15px' },
    codeBadge: { background: '#eff6ff', color: '#2563eb', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' },
    actionGroup: { display: 'flex', gap: '5px' },
    editBtn: { background: '#f1f5f9', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' },
    deleteBtn: { background: '#f1f5f9', color: '#ef4444', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' },
    courseTitle: { fontSize: '18px', fontWeight: '700', color: '#1e293b' },
    descriptionText: { fontSize: '14px', color: '#64748b', margin: '10px 0' },
    facultyBox: { borderTop: '1px solid #f1f5f9', paddingTop: '15px', marginTop: '10px' },
    label: { fontSize: '11px', color: '#94a3b8', fontWeight: '800', textTransform: 'uppercase' },
    select: { width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1' },
    teacherRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px' },
    viewBtn: { background: '#2c3e50', color: '#fff', border: 'none', padding: '6px 15px', borderRadius: '6px', cursor: 'pointer' },
    loader: { textAlign: 'center', marginTop: '100px', fontSize: '20px' }
};

export default CourseList;