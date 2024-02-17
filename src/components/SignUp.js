import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/registerStudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/success');
      } else {
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className='flex h-screen'>
      {/* left screen  */}
      <div className='bg-black text-white p-[15rem] flex flex-col justify-center items-center'>
        <h2 className='text-6xl font-bold'>Sign Up</h2>
        <p className='mt-4 text-3xl'>
          Welcome to <span className='text-[#EA501A]'>SKILLCODE</span>
        </p>
        <p className='w-9/12 mt-4 text-lg'>
          Create your account to start using our platform. It's free and always will be.
        </p>
      </div>
      {/* right screen  */}
      <div className='m-[5rem] text-xl'>
        <h1>SIGN UP</h1>
        <form onSubmit={handleSubmit} className='text-left'>
          <label htmlFor='name'>Name</label>
          <br />
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            className='border border-black rounded p-[0.5rem] w-[40vw]'
            required
          />
          <br />
          <label htmlFor='email'>Email</label>
          <br />
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            className='border border-black rounded p-[0.5rem] w-[40vw]'
            required
          />
          <br />
          <label htmlFor='password'>Password</label>
          <br />
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleInputChange}
            className='border border-black rounded p-[0.5rem] w-[40vw]'
            required
          />
          <br />
          <button type='submit' className='border border-black rounded mt-[2rem] px-[2rem]'>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
