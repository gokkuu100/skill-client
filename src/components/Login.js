import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [formData, setFormData ] = useState({email: '', password: ''})
    const navigate = useNavigate()

    function handleInputChange(e) {
        const { name, value } = e.target
        setFormData({...formData, [name]:value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch ("http://localhost:5000/api/login", {
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            if (response.ok) {
                const data = await response.json()
                if (data.token) {
                    localStorage.setItem('token', data.token)
                    console.log(data);
                    navigate('/')
                } else {
                    console.error('Authentication failed');
                }
            } else {
                console.error("Invalid credentials");
            }
        } catch (e) {
            console.error(e);

        }
    }

  return (
    <div className='flex h-screen'>
        {/* left screen */}
        <div className='bg-black text-white p-[15rem] flex flex-col justify-center items-center'>
            <h1 className='text-[20px]'>Welcome Back to <span className='text-[#EA501A]'>SKILLCODE</span></h1>
        </div>
        {/* right screen */}
        <div className='m-[5rem] text-xl'>
            <h1>LOGIN</h1><br />
            <form className='text-left' onSubmit={handleSubmit}>
                <label htmlFor='email'>Email</label><br />
                <input type='email' name='email' value={formData.email} onChange={handleInputChange} placeholder='hope@gmail.com' className='border border-black rounded p-[0.5rem] w-[40vw]'></input><br />
                <label htmlFor='password'>Password</label><br />
                <input type='password' name='password' value={formData.password} onChange={handleInputChange} placeholder='****' className='border border-black rounded p-[0.5rem] w-[40vw]' required></input><br />
                <button type="submit" className='border border-black rounded mt-[2rem] px-[2rem]'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login