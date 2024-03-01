// MentorLayout.js
import React from 'react';
import Sidebar from './studentDashboard/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Profile from './studentDashboard/Profile';
import Assessment from './studentDashboard/Assessment';
import Questions from './studentDashboard/Questions';
import Invites from './studentDashboard/Invites';
import Grades from './studentDashboard/Grades';

function MentorLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/questions/:assessmentId" element={<Questions />} />
        <Route path="/invites" element={<Invites />} />
        <Route path="/grades" element={<Grades />} />
      </Routes>
    </div>
  );
}

export default MentorLayout;
