import React from 'react';
import { Link } from 'react-router-dom';
import './homepage.css'; 

function HomePage() {
  return (
    <div className='home-page'>
      <div className='border border-box bg-slate-800 p-[1rem] text-white flex justify-around'>
        <h1>SKILLCODE</h1>
        <nav>
          <Link to="/login">LOGIN</Link>
        </nav>
      </div>
      <div className='content font-bold text-left text-[35px] m-[10rem] '>
        <h1>
          <span className='text-[#EA501A]'>Unleash your coding</span><br />
          <span className='text-[#EA501A]'>Potential with</span><br />
          <span className='text-[#EA501A]'>Engaging challenges</span><br />
          <span className='text-blue-950'>Elevate Your Skills One Line at a time</span>
        </h1>

        <Link to="/signup">
          <button className='border border-box border-orange-400 mt-[3rem] p-[0.5rem] text-[25px] text-xl'>
            <span className='text-[#EA501A]'>JOIN</span> <span className='text-white'>US</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
