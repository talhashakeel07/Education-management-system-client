import React, { useState } from 'react';
import axios from 'axios';

const CourseAdd = () => {
  const [form, setForm] = useState({
    courseName: '',
    courseCode: '',
    description: '',
    credits: 3,
    teacher: ''
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  // ✅ FIXED: Ab ye Render URL use karega agar mojood ho
  const base = `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/user`;

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'credits' ? Number(value) : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    
    if (!form.courseName || !form.courseCode) {
      setMsg({ type: 'error', text: 'Course name and code required' });
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Login required');

      const payload = {
        courseName: form.courseName,
        courseCode: form.courseCode,
        description: form.description,
        credits: form.credits,
        teacher: form.teacher 
      };

      const res = await axios.post(`${base}/add-course`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMsg({ type: 'success', text: res.data.msg || 'Course added successfully' });
      setForm({ courseName: '', courseCode: '', description: '', credits: 3, teacher: '' });
    } catch (err) {
      setMsg({ 
        type: 'error', 
        text: err.response?.data?.msg || 'Failed to add course' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={title}>Add Course</h2>
        {msg && (
          <div style={{ ...alertStyle, background: msg.type === 'success' ? '#e6ffed' : '#ffe6e6', color: msg.type === 'success' ? '#056a29' : '#a10f0f' }}>
            {msg.text}
          </div>
        )}
        <form onSubmit={handleSubmit} style={formStyle}>
          <label style={label}>Course Name
            <input name="courseName" value={form.courseName} onChange={handleChange} style={input} required />
          </label>
          <label style={label}>Course Code
            <input name="courseCode" value={form.courseCode} onChange={handleChange} style={input} required />
          </label>
          <label style={label}>Description
            <textarea name="description" value={form.description} onChange={handleChange} style={{ ...input, height: '80px' }} />
          </label>
          <label style={label}>Credits
            <input name="credits" type="number" min="1" value={form.credits} onChange={handleChange} style={input} />
          </label>
          <label style={label}>Teacher Name
            <input name="teacher" value={form.teacher} onChange={handleChange} style={input} />
          </label>
          <button type="submit" style={{ ...button, opacity: loading ? 0.7 : 1 }} disabled={loading}>
            {loading ? 'Adding...' : 'Add Course'}
          </button>
        </form>
      </div>
    </div>
  );
};

// Styles (Same as yours)
const container = { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', minHeight: '70vh', background: '#f5f7fb' };
const card = { width: '520px', background: '#fff', padding: '24px', borderRadius: '10px', boxShadow: '0 6px 18px rgba(23,24,25,0.08)' };
const title = { margin: '0 0 12px 0', textAlign: 'center', color: '#222' };
const alertStyle = { padding: '10px 12px', borderRadius: '6px', marginBottom: '12px', fontSize: '14px' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '10px' };
const label = { display: 'flex', flexDirection: 'column', fontSize: '14px', color: '#444' };
const input = { marginTop: '6px', padding: '10px', borderRadius: '6px', border: '1px solid #dfe6ef', fontSize: '14px' };
const button = { marginTop: '8px', padding: '10px 14px', borderRadius: '6px', border: 'none', background: '#2c7be5', color: '#fff', fontWeight: '600', cursor: 'pointer' };

export default CourseAdd;