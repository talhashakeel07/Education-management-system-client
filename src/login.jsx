import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Render Backend URL setup
    // Agar .env mein link nahi hoga toh ye localhost:8000 use karega
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Updated line to use Render URL
            const res = await axios.post(`${API_BASE_URL}/api/user/login`, { email, password });
            
            console.log("Login Response Data:", res.data);

            const token = res.data.token;
            const user = res.data.user;

            localStorage.setItem('token', token);
            localStorage.setItem('role', user.role.toLowerCase()); 
            localStorage.setItem('userName', user.name); 

            window.dispatchEvent(new Event("storage"));

            alert(`Welcome ${user.name}! Login Successful.`);

            const userRole = user.role.toLowerCase();
            
            if (userRole === 'admin') {
                navigate('/dashboard'); 
            } else if (userRole === 'teacher') {
                navigate('/dashboard'); 
            } else if (userRole === 'student') {
                navigate('/available-courses');
            } else {
                navigate('/dashboard');
            }

            window.location.reload(); 

        } catch (err) {
            console.error(err);
            alert(err.response?.data?.msg || "Login failed! Please check your credentials.");
        }
    };

    return (
        <div style={containerStyle}>
            <form onSubmit={handleLogin} style={formStyle}>
                <h2 style={{textAlign:'center', marginBottom:'20px', color: '#1e293b', fontWeight: '800'}}>(EMS) Portal Login</h2>
                
                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Email Address</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        style={inputStyle} 
                        placeholder="Please enter your email" 
                    />
                </div>

                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        style={inputStyle} 
                        placeholder="Please enter your password" 
                    />
                </div>

                <button type="submit" style={buttonStyle}>Log In</button>
            </form>
        </div>
    );
};

// --- MODERN STYLES ---
const containerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f8fafc' };
const formStyle = { padding: '40px', borderRadius: '20px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', width: '400px', background:'#fff', border: '1px solid #e2e8f0' };
const inputGroupStyle = { marginBottom: '25px' };
const labelStyle = { display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '700', color: '#475569' };
const inputStyle = { width: '100%', padding: '14px', boxSizing: 'border-box', borderRadius:'12px', border:'1px solid #cbd5e1', fontSize: '15px', outline: 'none', transition: 'border-color 0.2s' };
const buttonStyle = { width: '100%', padding: '14px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight:'700', fontSize: '16px', marginTop: '10px', boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.4)' };

export default Login;