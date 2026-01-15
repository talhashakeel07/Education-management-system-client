import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components Import
import Navbar from './Component/Navbar'; 
import Login from './login';
import AvailableCourses from './Component/AvailableCourses';
import MyEnrolledCourses from './Component/MyEnrolledCourses';
import Dashboard from './Component/Dashboard';
import AllStudents from './Component/AllStudents';
import CourseList from './Component/CourseList';
import StudentAdd from './Component/StudentAdd';
import CourseAdd from './Component/CourseAdd';
import TeacherAdd from './Component/TeacherAdd';
import StudentCourses from './Component/StudentCourses';
import AllTeachers from './Component/AllTeachers';
import CourseCatalog from './Component/CourseCatalog';
import CourseEdit from './Component/CourseEdit';
import CourseView from './Component/CourseView'; 
import Footer from './footer/footer'; 

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f8fafc' }}>
        <Navbar /> 
        
        <div className="container" style={{ paddingTop: '100px', flex: '1', paddingBottom: '60px' }}>
          <Routes>
            {/* Jab koi "/" par aaye toh login par bhej do */}
            <Route path="/" element={<Navigate to="/login" />} />

            {/* Login Route (Ab yahan sirf Login screen nazar ayegi) */}
            <Route path="/login" element={<Login />} />

            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Admin/Teacher Routes */}
            <Route path="/all-students" element={<AllStudents />} />
            <Route path="/all-courses" element={<CourseList />} />
            <Route path="/student-add" element={<StudentAdd />} />
            <Route path="/course-add" element={<CourseAdd />} />
            <Route path="/teacher-add" element={<TeacherAdd />} />
            <Route path="/all-teachers" element={<AllTeachers />} />
            <Route path="/course-edit/:id" element={<CourseEdit />} />

            {/* Student Routes */}
            <Route path="/catalog" element={<CourseCatalog />} />
            <Route path="/available-courses" element={<AvailableCourses />} />
            <Route path="/my-courses" element={<MyEnrolledCourses />} />
            <Route path="/student-enroll" element={<StudentCourses />} />
            <Route path="/course-view/:id" element={<CourseView />} />

            {/* Agar koi galat URL ho toh Redirect to Login */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>   
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;