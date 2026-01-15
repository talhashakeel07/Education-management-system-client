import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const CourseEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const base = 'http://localhost:8000/api/user';

    const [formData, setFormData] = useState({
        title: '',
        courseCode: '',
        description: '',
        credits: 3,
        teacher: '',    
        teacherName: ''  
    });
    
    const [teachers, setTeachers] = useState([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = { Authorization: `Bearer ${token}` };
                
                const teacherRes = await axios.get(`${base}/all-teachers`, { headers });
                const teacherList = teacherRes.data.teachers || teacherRes.data || [];
                setTeachers(teacherList);

                const courseRes = await axios.get(`${base}/course/${id}`, { headers });
                
                setFormData({
                    title: courseRes.data.title || '',
                    courseCode: courseRes.data.courseCode || '',
                    description: courseRes.data.description || '',
                    credits: courseRes.data.credits || 3,
                    teacher: courseRes.data.teacher || '', 
                    teacherName: courseRes.data.teacherName || 'TBA'
                });
                
                setLoading(false);
            } catch (err) {
                console.error("Fetch Error:", err);
                setLoading(false);
            }
        };
        fetchData();
    }, [id, token]);

    const handleTeacherChange = (e) => {
        const selectedId = e.target.value;
        const selectedTeacher = teachers.find(t => t._id === selectedId);
        
        setFormData({
            ...formData,
            teacher: selectedId,
            teacherName: selectedTeacher ? selectedTeacher.name : 'TBA'
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${base}/update-course/${id}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Course & Instructor updated successfully!");
            navigate('/all-courses');
        } catch (err) {
            alert(err.response?.data?.msg || "Update failed.");
        }
    };

    if (loading) return <div style={{textAlign:'center', padding:'50px'}}>Loading Details...</div>;

    return (
        <div style={{padding: '40px', maxWidth: '600px', margin: '0 auto', background:'#fff', borderRadius:'15px', boxShadow:'0 4px 12px rgba(0,0,0,0.1)'}}>
            <h2 style={{textAlign: 'center', marginBottom: '30px', color:'#1e293b'}}>Edit Course & Instructor</h2>
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                
                <div>
                    <label style={{fontWeight:'bold'}}>Course Title</label>
                    <input style={styles.input} value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
                </div>

                <div>
                    <label style={{fontWeight:'bold'}}>Course Code</label>
                    <input style={styles.input} value={formData.courseCode} onChange={(e) => setFormData({...formData, courseCode: e.target.value})} required />
                </div>
                
                <div>
                    <label style={{fontWeight:'bold'}}>Assigned Instructor</label>
                    <select 
                        style={styles.input} 
                        value={formData.teacher} 
                        onChange={handleTeacherChange}
                    >
                        <option value="">Select Instructor (TBA)</option>
                        {teachers.map(t => (
                            <option key={t._id} value={t._id}>{t.name}</option>
                        ))}
                    </select>
                    <p style={{fontSize:'12px', color:'#2563eb', marginTop:'5px', fontWeight:'600'}}>
                        Current Assigned: {formData.teacherName}
                    </p>
                </div>

                <div>
                    <label style={{fontWeight:'bold'}}>Credits</label>
                    <input type="number" style={styles.input} value={formData.credits} onChange={(e) => setFormData({...formData, credits: e.target.value})} />
                </div>

                <div>
                    <label style={{fontWeight:'bold'}}>Description</label>
                    <textarea style={styles.input} rows="4" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                </div>

                <div style={{display:'flex', gap:'10px', marginTop:'20px'}}>
                    <button type="button" onClick={() => navigate('/all-courses')} style={styles.cancelBtn}>Cancel</button>
                    <button type="submit" style={styles.submitBtn}>Save Changes</button>
                </div>
            </form>
        </div>
    );
};

const styles = {
    input: { width:'100%', padding:'12px', borderRadius:'8px', border:'1px solid #cbd5e1', marginTop:'5px', fontSize:'14px' },
    submitBtn: { flex:2, padding:'12px', background:'#2563eb', color:'white', border:'none', borderRadius:'8px', cursor:'pointer', fontWeight:'bold' },
    cancelBtn: { flex:1, padding:'12px', background:'#f1f5f9', border:'none', borderRadius:'8px', cursor:'pointer', fontWeight:'bold' }
};

export default CourseEdit;