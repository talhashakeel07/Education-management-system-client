import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllStudents = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    const base = `${API_BASE}/api/user`;

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${base}/all-students`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStudents(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Fetch Error:", err);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`${base}/delete-student/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert("Student Deleted!");
                setStudents(students.filter(student => student._id !== id));
            } catch (err) {
                alert("Delete fail: " + (err.response?.data?.msg || "Server Error"));
            }
        }
    };

    if (loading) return <div className="page-wrapper"><h2>Loading Students...</h2></div>;

    return (
        <div style={{ padding: '20px 10px', width: '100%' }}> 
            <h1 style={{ marginBottom: '2%', paddingLeft: '18%' }}>Registered Students</h1>
            
            <div className="table-container" style={tableContainerStyle}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#2c3e50', color: 'white' }}>
                            <th style={thStyle}>Name</th>
                            <th style={thStyle}>Email</th>
                            <th style={thStyle}>Role</th>
                            <th style={thStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(s => (
                            <tr key={s._id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={tdStyle}>{s.name}</td>
                                <td style={tdStyle}>{s.email}</td>
                                <td style={tdStyle}>{s.role}</td>
                                <td style={tdStyle}>
                                    <button 
                                        onClick={() => handleDelete(s._id)} 
                                        style={deleteBtnStyle}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// --- Styles (Same as yours) ---
const tableContainerStyle = {
    background: 'white',
    borderRadius: '20px',
    boxShadow: '0 2px 10px rgba(29, 22, 22, 0.1)',
    overflowX: 'auto',
    margin: '0 auto',
    width: '65%'
};

const thStyle = { padding: '15px', textAlign: 'left' };
const tdStyle = { padding: '15px' };
const deleteBtnStyle = { 
    background: '#d85445ff', 
    color: 'white', 
    border: 'none', 
    padding: '8px 15px', 
    borderRadius: '5px', 
    cursor: 'pointer',
    fontWeight: 'bold'
};

export default AllStudents;