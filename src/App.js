import './App.css';
import HomePage from './components/HomePage';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Sidebar from './components/studentDashboard/Sidebar';
import Profile from './components/studentDashboard/Profile';
import Assessment from './components/studentDashboard/Assessment';
import Questions from './components/studentDashboard/Questions';
import Invites from './components/studentDashboard/Invites';
import Grades from './components/studentDashboard/Grades';
import MentoProfile from './components/mentorDashboard/MentorProfile';
import MentorSidebar from './components/mentorDashboard/MentorSidebar';
import CreateAssessment from './components/mentorDashboard/CreateAssessment';
import SendInvites from './components/mentorDashboard/SendInvites';
import MentorGrades from './components/mentorDashboard/MentorGrades';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/menu' element={<Sidebar />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/assessment' element={<Assessment />}></Route>
        <Route path='/questions/:assessmentId' element={<Questions />}></Route>
        <Route path='/invites' element={<Invites />}></Route>
        <Route path='/grades' element={<Grades />}></Route>

        <Route path='/mentor/profile' element={<MentoProfile />}></Route>
        <Route path='/mentor/menu' element={<MentorSidebar />}></Route>
        <Route path='/create' element={<CreateAssessment />}></Route>
        <Route path='/mentor/invites' element={<SendInvites />}></Route>
        <Route path='/mentor/grades' element={<MentorGrades />}></Route>
        
      </Routes>
    </div>
  );
}

export default App;
