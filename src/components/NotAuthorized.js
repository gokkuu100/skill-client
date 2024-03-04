import React from 'react';

function NotAuthorized() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-4xl font-bold text-red-500'>Not Authorized</h1>
      <p className='text-gray-600'>You are not authorized to access this page. Please log in.</p>
    </div>
  );
}

export default NotAuthorized;
