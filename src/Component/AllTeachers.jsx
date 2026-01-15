import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const base = 'http://localhost:8000/api/user';
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await axios.get(`${base}/all-teachers`, {
        headers: { Authorization: `Bearer ${token}` }
      });
     
      setTeachers(Array.isArray(res.data) ? res.data : res.data.teachers || []);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this teacher?")) {
      try {
        await axios.delete(`${base}/delete-teacher/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTeachers(teachers.filter(t => t._id !== id));
      } catch (err) {
        alert("Delete failed!");
      }
    }
  };

  if (loading) return <div style={styles.loader}>Loading Faculty Records...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Faculty Directory</h1>
        <p style={styles.subtitle}>Manage all authorized instructors.</p>
      </div>
      <div style={styles.grid}>
        {teachers.map(t => (
          <div key={t._id} style={styles.card}>
            <div style={styles.avatar}>{t.name.charAt(0)}</div>
            <h3 style={styles.name}>{t.name}</h3>
            <p style={styles.email}>{t.email}</p>
            <span style={styles.badge}>{t.specialization || 'General Faculty'}</span>
            <button onClick={() => handleDelete(t._id)} style={styles.deleteBtn}>Remove Teacher</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '40px 5%', background: '#f8fafc', minHeight: '100vh' },
  header: { marginBottom: '30px' },
  title: { fontSize: '28px', color: '#1e293b', fontWeight: '800' },
  subtitle: { color: '#64748b' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' },
  card: { background: '#fff', padding: '25px', borderRadius: '15px', textAlign: 'center', border: '1px solid #e2e8f0' },
  avatar: { width: '60px', height: '60px', background: '#3b82f6', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px', fontSize: '24px', fontWeight: 'bold' },
  name: { fontSize: '18px', fontWeight: '700', color: '#1e293b', margin: '0 0 5px' },
  email: { fontSize: '14px', color: '#64748b', marginBottom: '15px' },
  badge: { display: 'inline-block', padding: '4px 12px', background: '#eff6ff', color: '#2563eb', borderRadius: '20px', fontSize: '12px', fontWeight: '700', marginBottom: '20px' },
  deleteBtn: { width: '100%', padding: '10px', background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
  loader: { textAlign: 'center', marginTop: '100px', fontSize: '20px' }
};

export default AllTeachers;