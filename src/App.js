import './App.css';
import HomePage from './components/HomePage';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Sidebar from './components/studentDashboard/Sidebar';
import Profile from './components/studentDashboard/Profile';
import Assessment from './components/studentDashboard/Assessment';

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


      </Routes>
    </div>
  );
}

export default App;
