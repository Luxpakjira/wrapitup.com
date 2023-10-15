import React, { useEffect, useState } from 'react';
import './index.css';

function TopTracks() {
  const [topTracks, setTopTracks] = useState([]);
  const [timeRange, setTimeRange] = useState('long_term');

  const fetchTopTracks = (newTimeRange) => {
    fetch(`/getTopTracks?time_range=${newTimeRange}`)
      .then((response) => response.json())
      .then((data) => {
        setTopTracks(data.top_tracks);
        setTimeRange(newTimeRange);
      })
      .catch((error) => {
        console.error('Error fetching top tracks:', error);
      });
  };

  useEffect(() => {
    fetchTopTracks(timeRange);
  }, [timeRange]);

  return (
    <div>
      <div className="py-10 bg-gray-300">
        <div className='flex  py-8 px-4'>
          <h2 className='self-center text-6xl font-semibold text-black'>
            Your Top Tracks
          </h2>
          <div className='flex ml-auto relative'>
            <button
              className="bg-white text-gray-800 font-bold py-2 px-4 border border-gray-400 rounded shadow hover:bg-blue-200 mx-2"
              onClick={() => fetchTopTracks('short_term')}
            >
              4 Weeks
            </button>
            <button
              className="bg-white text-gray-800 font-bold py-2 px-4 border border-gray-400 rounded shadow hover:bg-blue-200 mx-2"
              onClick={() => fetchTopTracks('medium_term')}
            >
              6 Months
            </button>
            <button
              className="bg-white text-gray-800 font-bold py-2 px-4 border border-gray-400 rounded shadow hover:bg-blue-200 mx-2"
              onClick={() => fetchTopTracks('long_term')}
            >
              All Time
            </button>
          </div>
        </div>
        <div className="mx-auto bg-gray-200 shadow-lg rounded-lg overflow-hidden md:max-w-4xl py-4">
          <div className="md:flex">
            <div className="w-full p-4">
              <ul style={{ maxHeight: '800px', overflowY: 'auto' }}>
                {topTracks.map((track, index) => (
                  <div key={index}>
                    <li className="flex justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded cursor-pointer transition">
                      <div className="flex ml-2">
                        <img src={track.image_url} width="80" height="80" className="rounded-md" />
                        <div className="flex flex-col ml-2">
                          <span className="font-medium text-black">{track.name}</span>
                          <span className="text-sm text-gray-400 truncate w-32">{track.artist}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-gray-600">#{index + 1}</span>
                        <i className="fa fa-star text-green-400"></i>
                      </div>
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopTracks;
