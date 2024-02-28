import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from  'yup';

const validationSchema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required')
})
function Login() {
    const [formData, setFormData ] = useState({email: '', password: ''})
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    function handleInputChange(e) {
        const { name, value } = e.target
        setFormData({...formData, [name]:value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await validationSchema.validate(formData, { abortEarly: false})

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
                    localStorage.setItem('id', data.user.id)

                    if (data.user.role === 'student') {
                        navigate('/menu')
                    } else if (data.user.role === 'mentor') {
                        navigate('/mentor/menu')
                    } else {
                        console.error("error");
                    }
                } else {
                    console.error('Authentication failed');
                }
            } else {
                const data = await response.json()
                if (response.status === 401) {
                    setErrors({ general: 'Invalid email or password' });
                } else if (response.status === 400) {
                    setErrors({ ...data.errors });
                } else {
                    setErrors({ general: 'Unexpected error occurred' });
                }
            }
        } catch (error) {
            if (error.name === 'ValidationError') {
                // Handle yup validation error
                const validationErrors = {};
                error.inner.forEach((validationError) => {
                    validationErrors[validationError.path] = validationError.message;
                });
                setErrors(validationErrors);
            } else {
                console.error(error);
                setErrors({ general: 'An unexpected error occurred' });
            }
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
                {errors.email && <span className='text-red-500'>{errors.email}</span>}<br />
                <label htmlFor='password'>Password</label><br />
                <input type='password' name='password' value={formData.password} onChange={handleInputChange} placeholder='****' className='border border-black rounded p-[0.5rem] w-[40vw]' required></input><br />
                {errors.password && <span className='text-red-500'>{errors.password}</span>}<br />
                <button type="submit" className='border border-black rounded mt-[2rem] px-[2rem]'>Login</button>
                {errors.general && <div className='text-red-500 mt-2'>{errors.general}</div>} 
            </form>
        </div>
    </div>
  )
}

export default Login