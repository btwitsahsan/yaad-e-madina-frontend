import React, { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import Loader from '../../Loader';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  // Simulate a network request or some asynchronous operation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Change this to match your actual loading duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {loading ? (
        <Loader/>
      ) : (
        <>
          <div className="w-full sm:w-1/2 md:w-1/5 p-4 rounded-lg bg-gray-800">
            <div className="flex flex-col gap-4 items-center py-6">
              <span className="font-bold text-4xl text-rose-600">5</span>
              <h6 className="font-semibold text-lg text-white">Categories</h6>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/5 p-4 rounded-lg bg-gray-800">
            <div className="flex flex-col gap-4 items-center py-6">
              <span className="font-bold text-4xl text-orange-600">22</span>
              <h6 className="font-semibold text-lg text-white">Artists</h6>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/5 p-4 rounded-lg bg-gray-800">
            <div className="flex flex-col gap-4 items-center py-6">
              <span className="font-bold text-4xl text-yellow-600">16</span>
              <h6 className="font-semibold text-lg text-white">Album</h6>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/5 p-4 rounded-lg bg-gray-800">
            <div className="flex flex-col gap-4 items-center py-6">
              <span className="font-bold text-4xl text-pink-600">5</span>
              <h6 className="font-semibold text-lg text-white">Naats</h6>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/5 p-4 rounded-lg bg-gray-800">
            <div className="flex flex-col gap-4 items-center py-6">
              <span className="font-bold text-4xl text-green-600">10</span>
              <h6 className="font-semibold text-lg text-white">Playlist</h6>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/5 p-4 rounded-lg bg-gray-800">
            <div className="flex flex-col gap-4 items-center py-6">
              <span className="font-bold text-4xl text-purple-600">5</span>
              <h6 className="font-semibold text-lg text-white">Users</h6>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/5 p-4 rounded-lg bg-gray-800">
            <div className="flex flex-col gap-4 items-center py-6">
              <span className="font-bold text-4xl text-blue-600">5</span>
              <h6 className="font-semibold text-lg text-white">Suggestions</h6>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/5 p-4 rounded-lg bg-gray-800">
            <div className="flex flex-col gap-4 items-center py-6">
              <span className="font-bold text-4xl text-sky-600">5</span>
              <h6 className="font-semibold text-lg text-white">Reports</h6>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
