// StudentLayout.js
import React from 'react';
import Sidebar from './studentDashboard/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Profile from './studentDashboard/Profile';
import Assessment from './studentDashboard/Assessment';
import Questions from './studentDashboard/Questions';
import Invites from './studentDashboard/Invites';
import Grades from './studentDashboard/Grades';

function StudentLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className='remaining-side w-full text-black'>
        <Routes>
          <Route path="/student/profile" element={<Profile />} />
          <Route path="/student/assessment" element={<Assessment />} />
          <Route path="/student/questions/:assessmentId" element={<Questions />} />
          <Route path="/student/invites" element={<Invites />} />
          <Route path="/student/grades" element={<Grades />} />
        </Routes>
      </div>    </div>
  );
}

export default StudentLayout;
