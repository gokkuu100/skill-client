import React from 'react';

function Assessment() {
  return (
    <div className='flex flex-col w-full'>
      <div className="w-full p-4 bg-gray-800 flex-none hidden md:block">
        <h1 className='text-white'>ASSESSMENTS</h1>
      </div>
      <div className='tables overflow-x-auto'>
        <table id="assessments" className="ml-[10rem] bg-white border border-gray-300 shadow-lg w-[60%] table-auto">
          <thead>
            <tr className='bg-gray-200'>
              <th className='p-4 text-center font-bold uppercase tracking-widest border'>Title</th>
              <th className='p-4 text-center font-bold uppercase tracking-widest border'>Number of questions</th>
              <th className='p-4 text-center font-bold uppercase tracking-widest border'>Description</th>
              <th className='p-4 text-center font-bold uppercase tracking-widest border'>Completed</th>
              <th className='p-4 text-center font-bold uppercase tracking-widest border'>Mentor</th>
            </tr>
          </thead>
          <tbody>
            <tr className='border'>
              <td className='p-4 border'>JS Assessment</td>
              <td className='p-4 text-center border'>12</td>
              <td className='p-4 border'>A simple web development assessment</td>
              <td className='p-4 text-center border'>Yes</td>
              <td className='p-4 border'>Peter Muturi</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Assessment;
