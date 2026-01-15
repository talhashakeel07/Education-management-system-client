import React, { useState } from 'react';
import axios from 'axios';

const TeacherAdd = () => {
    const [form, setForm] = useState({ 
        name: '', 
        email: '', 
        password: '', 
        department: '', 
        phone: '' 
    });
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState(null);
    const base = 'http://localhost:8000/api/user';

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg(null);
        setLoading(true);

        const token = localStorage.getItem('token');
        try {
            const res = await axios.post(`${base}/add-teacher`, form, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMsg({ type: 'success', text: res.data.msg || "Teacher registered successfully!" });
            // Reset Form
            setForm({ name: '', email: '', password: '', department: '', phone: '' });
        } catch (err) {
            setMsg({ 
                type: 'error', 
                text: err.response?.data?.msg || "Error adding teacher. Please try again." 
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={container}>
            <div style={card}>
                <h2 style={title}>Register New Faculty</h2>
                <p style={subtitle}>Add a new teacher to the Education Management System.</p>

                {msg && (
                    <div style={{ 
                        ...alertStyle, 
                        background: msg.type === 'success' ? '#e6ffed' : '#ffe6e6', 
                        color: msg.type === 'success' ? '#056a29' : '#a10f0f',
                        border: `1px solid ${msg.type === 'success' ? '#b7eb8f' : '#ffa39e'}`
                    }}>
                        {msg.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={formStyle}>
                    <label style={label}>Full Name
                        <input name="name" value={form.name} onChange={handleChange} style={input} placeholder="e.g. Dr. Muhammad Ali" required />
                    </label>

                    <label style={label}>Email Address
                        <input name="email" type="email" value={form.email} onChange={handleChange} style={input} placeholder="teacher@university.com" required />
                    </label>

                    <label style={label}>Account Password
                        <input name="password" type="password" value={form.password} onChange={handleChange} style={input} placeholder="Minimum 6 characters" required />
                    </label>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        <label style={label}>Department
                            <input name="department" value={form.department} onChange={handleChange} style={input} placeholder="e.g. Computer Science" />
                        </label>
                        <label style={label}>Phone Number
                            <input name="phone" value={form.phone} onChange={handleChange} style={input} placeholder="0300-XXXXXXX" />
                        </label>
                    </div>

                    <button type="submit" style={{ ...button, opacity: loading ? 0.7 : 1 }} disabled={loading}>
                        {loading ? 'Processing...' : 'Register Teacher'}
                    </button>
                </form>
            </div>
        </div>
    );
};

const container = { 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: '40px', 
    minHeight: '80vh', 
    background: '#f5f7fb' 
};

const card = { 
    width: '100%',
    maxWidth: '520px', 
    background: '#fff', 
    padding: '30px', 
    borderRadius: '12px', 
    boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
    border: '1px solid #eef2f6'
};

const title = { margin: '0 0 5px 0', textAlign: 'center', color: '#1e293b', fontSize: '24px', fontWeight: '800' };
const subtitle = { margin: '0 0 25px 0', textAlign: 'center', color: '#64748b', fontSize: '14px' };
const alertStyle = { padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', textAlign: 'center' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '15px' };
const label = { display: 'flex', flexDirection: 'column', fontSize: '13px', color: '#475569', fontWeight: '600' };
const input = { marginTop: '6px', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', outlineColor: '#2c7be5' };
const button = { 
    marginTop: '10px', 
    padding: '12px', 
    borderRadius: '8px', 
    border: 'none', 
    background: '#2c7be5', 
    color: '#fff', 
    fontWeight: '700', 
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.3s ease'
};

export default TeacherAdd;