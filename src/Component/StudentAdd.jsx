import React, { useState } from 'react';
import axios from 'axios';

const StudentAdd = () => {
  const [form, setForm] = useState({ name: '', email: '', rollNumber: '', course: '' });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  // ✅ FIXED: Render URL setup
  const base = `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/user`;

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    if (!form.name || !form.email) { 
      setMsg({ type: 'error', text: 'Name and Email required' }); 
      return; 
    }
    
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Login required');

      const res = await axios.post(`${base}/add-student`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMsg({ type: 'success', text: res.data.msg || 'Student added successfully' });
      // Reset form
      setForm({ name: '', email: '', course: '', rollNumber: '' });
    } catch (err) {
      setMsg({ 
        type: 'error', 
        text: err.response?.data?.msg || err.message || 'Failed to add student' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={title}>Add Student</h2>

        {msg && (
          <div style={{ 
            ...alertStyle, 
            background: msg.type === 'success' ? '#e6ffed' : '#ffe6e6', 
            color: msg.type === 'success' ? '#056a29' : '#a10f0f' 
          }}>
            {msg.text}
          </div>
        )}

        <form onSubmit={handleSubmit} style={formStyle}>
          <label style={label}>
            Name
            <input name="name" value={form.name} onChange={handleChange} style={input} required />
          </label>

          <label style={label}>
            Email
            <input name="email" type="email" value={form.email} onChange={handleChange} style={input} required />
          </label>

          <label style={label}>
            Course
            <input name="course" value={form.course} onChange={handleChange} style={input} />
          </label>

          <label style={label}>
             Roll Number
             <input name="rollNumber" value={form.rollNumber} onChange={handleChange} style={input} required />
          </label>

          <button type="submit" style={{ ...button, opacity: loading ? 0.7 : 1 }} disabled={loading}>
            {loading ? 'Adding...' : 'Add Student'}
          </button>
        </form>
      </div>
    </div>
  );
};

const container = {
  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', minHeight: '70vh', background: '#f5f7fb'
};
const card = {
  width: '420px', background: '#fff', padding: '24px', borderRadius: '10px', boxShadow: '0 6px 18px rgba(23,24,25,0.08)'
};
const title = { margin: '0 0 12px 0', textAlign: 'center', color: '#222' };
const alertStyle = { padding: '10px 12px', borderRadius: '6px', marginBottom: '12px', fontSize: '14px' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '10px' };
const label = { display: 'flex', flexDirection: 'column', fontSize: '14px', color: '#444' };
const input = { marginTop: '6px', padding: '10px', borderRadius: '6px', border: '1px solid #dfe6ef', fontSize: '14px' };
const button = { marginTop: '8px', padding: '10px 14px', borderRadius: '6px', border: 'none', background: '#2c7be5', color: '#fff', fontWeight: '600', cursor: 'pointer' };

export default StudentAdd;