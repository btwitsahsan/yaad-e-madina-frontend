import React, { useState, useEffect } from 'react';
import Loader from '../../Loader';
import { dashboardData } from '../../network/api';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({
    categories: 0,
    naatKhawans: 0,
    albums: 0,
    audios: 0,
    playlists: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await dashboardData();

        setCounts({
          categories: resp.categories,
          naatKhawans: resp.naatKhawans,
          albums: resp.albums,
          audios: resp.audios,
          playlists: resp.playlists,
          
        });
        // setCounts({
        //   categories: 0,
        //   naatKhawans: 0,
        //   albums: 0,
        //   audios: 0,
        //   playlists: 0,
          
        // });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard counts:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    {loading ? (
      
        <Loader />
   
    ) : (
      <>
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
          <div className="p-4 rounded-lg bg-primary-gray">
            <div className="flex flex-col gap-3 items-center py-3">
              <span className="font-bold text-3xl text-rose-600">{counts.categories}</span>
              <h6 className="font-semibold text-md text-white">Categories</h6>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-primary-gray">
            <div className="flex flex-col gap-3 items-center py-3">
              <span className="font-bold text-3xl text-orange-600">{counts.naatKhawans}</span>
              <h6 className="font-semibold text-md text-white">Artists</h6>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-primary-gray">
            <div className="flex flex-col gap-3 items-center py-3">
              <span className="font-bold text-3xl text-yellow-600">{counts.albums}</span>
              <h6 className="font-semibold text-md text-white">Albums</h6>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-primary-gray">
            <div className="flex flex-col gap-3 items-center py-3">
              <span className="font-bold text-3xl text-pink-600">{counts.audios}</span>
              <h6 className="font-semibold text-md text-white">Naats</h6>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-primary-gray">
            <div className="flex flex-col gap-3 items-center py-3">
              <span className="font-bold text-3xl text-green-600">{counts.playlists}</span>
              <h6 className="font-semibold text-md text-white">Playlists</h6>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-primary-gray">
            <div className="flex flex-col gap-3 items-center py-3">
              <span className="font-bold text-3xl text-purple-600">0</span>
              <h6 className="font-semibold text-md text-white">Users</h6>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-primary-gray">
            <div className="flex flex-col gap-3 items-center py-3">
              <span className="font-bold text-3xl text-blue-600">0</span>
              <h6 className="font-semibold text-md text-white">Suggestions</h6>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-primary-gray">
            <div className="flex flex-col gap-3 items-center py-3">
              <span className="font-bold text-3xl text-sky-600">0</span>
              <h6 className="font-semibold text-md text-white">Reports</h6>
            </div>
          </div>
    </div>
    <div className='flex gap-4'>
<div className='flex flex-col w-1/3 bg-primary-gray rounded-lg p-4 mt-4 '>
<h3 className='font-semibold text-md text-white'>Top Treading Now</h3>
<p className=' text-sm text-slate-500'>Based on Last 30 Days</p>
<div className='flex flex-col gap-2 mt-8'>
  <div className='flex justify-between'>
<h3 className='font-semibold text-md text-white'>Thank God yara</h3>
<span className='font-sm text-sm text-white bg-red-600 px-1 m-0 rounded-md'>34 views</span>
</div>
  <div className='flex justify-between'>
<h3 className='font-semibold text-md text-white'>Thank God yara</h3>
<span className='font-sm text-sm text-white bg-red-600 px-1 m-0 rounded-md'>34 views</span>
</div>
  <div className='flex justify-between'>
<h3 className='font-semibold text-md text-white'>Thank God yara</h3>
<span className='font-sm text-sm text-white bg-red-600 px-1 m-0 rounded-md'>34 views</span>
</div>
  <div className='flex justify-between'>
<h3 className='font-semibold text-md text-white'>Thank God yara</h3>
<span className='font-sm text-sm text-white bg-red-600 px-1 m-0 rounded-md'>34 views</span>
</div>
  <div className='flex justify-between'>
<h3 className='font-semibold text-md text-white'>Thank God yara</h3>
<span className='font-sm text-sm text-white bg-red-600 px-1 m-0 rounded-md'>34 views</span>
</div>
</div>
</div>
    <div className="w-2/3 bg-primary-gray rounded p-4 mt-4">
<h2 className='font-semibold text-md text-white'>Lastest Suggestions</h2>
      <div className="overflow-x-auto mt-3">
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr>
              <th className="border border-gray-600 p-3 text-white text-left">
                Title
              </th>
              <th className="border border-gray-600 p-3 text-white text-left">
                Image
              </th>
              <th className="border border-gray-600 p-3 text-white text-left">
                Date
              </th>
              <th className="border border-gray-600 p-3 text-white text-left">
                Name
              </th>
            
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="border border-gray-600 p-3 text-white">
                title
              </td>
              <td className="border border-gray-600 p-3 text-white">
                imageurl
              </td>
             
              <td className="border border-gray-600 p-3 text-white">
                mm/dd/yyyy
              </td>
              <td className="border border-gray-600 p-3 text-white">
                John Doe
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
</>
    )}
  </>
  );
};

export default Dashboard;
