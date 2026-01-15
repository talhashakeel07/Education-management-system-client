import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const location = useLocation();
    const isDashboard = location.pathname === '/dashboard';

    const dashboardStyles = isDashboard ? {
        marginTop: '-100px', 
        borderTopLeftRadius: '40px', 
        borderTopRightRadius: '40px', 
        zIndex: '100'
    } : { marginTop: '60px' };

    return (
        <footer style={{ ...styles.footer, ...dashboardStyles }}>
            <div style={styles.container}>
                
                {/* 1. Branding Section with Student Image/Icon */}
                <div style={styles.section}>
                    <div style={styles.brandHeader}>
                        <div style={styles.imageContainer}>
                            <img 
                                src="/public/footer-image.png" 
                                alt="Student" 
                                style={styles.studentImage}
                                onError={(e) => {
                                    e.target.src = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"; // Default Student Icon
                                }} 
                            />
                        </div>
                        <div>
                            <h3 style={styles.brandTitle}>EMS <span style={{fontWeight: '400'}}>Portal</span></h3>
                            <p style={{margin: 0, fontSize: '12px', color: '#3b82f6', fontWeight: '600'}}>Education Management</p>
                        </div>
                    </div>
                    <p style={styles.description}>
                        Modern centralized Education Management System for academic efficiency and student success.
                    </p>
                </div>

                {/* 2. Navigation */}
                <div style={styles.section}>
                    <h4 style={styles.heading}>Navigation</h4>
                    <ul style={styles.list}>
                        <li><Link to="/dashboard" style={styles.link}>Dashboard</Link></li>
                        <li><Link to="/all-courses" style={styles.link}>Courses</Link></li>
                        <li><Link to="/all-students" style={styles.link}>Students List</Link></li>
                    </ul>
                </div>

                {/* 3. Support */}
                <div style={styles.section}>
                    <h4 style={styles.heading}>Contact Support</h4>
                    <p style={styles.infoText}>📧 helpdesk@emsportal.com</p>
                    <p style={styles.infoText}>📞 +92 300 1234567</p>
                </div>
            </div>

            <div style={styles.bottomBar}>
                <p style={styles.copyright}>© {currentYear} EduPortal EMS. All rights reserved.</p>
            </div>
        </footer>
    );
};

const styles = {
    footer: { 
        background: '#0f172a', 
        color: '#f8fafc', 
        padding: '80px 0 0 0', 
        position: 'relative' 
    },
    container: { 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '40px', 
        padding: '0 5% 60px 5%' 
    },
    section: { display: 'flex', flexDirection: 'column', gap: '16px' },
    brandHeader: { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '10px' },
    
    // IMAGE CONTAINER FIX
    imageContainer: {
        width: '70px', 
        height: '70px', 
        borderRadius: '50%',
        border: '3px solid #3b82f6',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
        flexShrink: 0 // Image ko chota hone se rokta hai
    },
    studentImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },

    brandTitle: { fontFamily: 'Poppins, sans-serif', fontSize: '24px', color: '#3b82f6', fontWeight: '700', margin: 0 },
    description: { color: '#94a3b8', fontSize: '14px', lineHeight: '1.6', maxWidth: '300px' },
    heading: { fontFamily: 'Poppins, sans-serif', fontSize: '18px', color: '#fff', fontWeight: '600', marginBottom: '4px' },
    list: { listStyle: 'none', padding: 0, margin: 0 },
    link: { fontFamily: 'Inter, sans-serif', color: '#94a3b8', textDecoration: 'none', fontSize: '14px', display: 'block', marginBottom: '12px' },
    infoText: { color: '#94a3b8', fontSize: '14px', margin: '0' },
    bottomBar: { background: '#020617', padding: '24px 0', textAlign: 'center', borderTop: '1px solid #1e293b' },
    copyright: { fontSize: '12px', color: '#475569', fontWeight: '500' }
};

export default Footer;