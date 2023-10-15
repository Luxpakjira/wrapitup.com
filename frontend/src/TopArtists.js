import React, { useEffect, useState } from 'react';
import './index.css';
function TopArtists() {
  const [topArtists, setTopArtists] = useState([]);
  const [timeRange, setTimeRange] = useState('long_term');

  const fetchTopArtists = (newTimeRange) => {
    fetch(`/getTopArtists?time_range=${newTimeRange}`)
      .then((response) => response.json())
      .then((data) => {
        setTopArtists(data.top_artists);
        setTimeRange(newTimeRange); 
      })
      .catch((error) => {
        console.error('Error fetching top tracks:', error);
      });
  };

  useEffect(() => {
    fetchTopArtists(timeRange);
  }, [timeRange]);

  {/*useEffect(() => {
    fetch('/getTopArtists')
      .then((response) => response.json())
      .then((data) => {
        setTopArtists(data.top_artists);
      })
      .catch((error) => {
        console.error('Error fetching top tracks:', error);
      });
  }, []);*/}

  return (
    <div className="bg-gray-800 ">
      <div className='flex  py-8 px-4'>
        <h2 className='self-center text-6xl font-semibold text-white'>
          Your Top Artist
        </h2>
      
        <div className='flex ml-auto relative'>
        <button
            className="bg-white text-gray-800 font-bold py-2 px-4 border border-gray-400 rounded shadow hover:bg-blue-200 mx-2"
            onClick={() => fetchTopArtists('short_term')}
          >
            4 Weeks
          </button>
          <button
            className="bg-white text-gray-800 font-bold py-2 px-4 border border-gray-400 rounded shadow hover:bg-blue-200 mx-2"
            onClick={() => fetchTopArtists('medium_term')}
          >
            6 Months
          </button>
          <button
            className="bg-white text-gray-800 font-bold py-2 px-4 border border-gray-400 rounded shadow hover:bg-blue-200 mx-2"
            onClick={() => fetchTopArtists('long_term')}
          >
            All Time
          </button>
        </div>
      </div>
      <div className='bg-gray-800 flex flex-no-wrap overflow-x-scroll scrolling-touch mb-8  md:flex'>
      {topArtists.map((artist, index) => (
        <a href="#" key={index}>
          <div
            className="h-[40rem] w-[10rem] bg-white border border-gray-200 rounded-lg shadow mx-0.5 hover:w-[20rem]"
            style={{ backgroundImage: `url(${artist.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                {index + 1} {artist.name}
              </h5>
            </div>
          </div>
        </a>
      ))}
      </div>
    </div>
    );
}

export default TopArtists;

{/*<h2>Top Artists</h2>
      <ul>
        {topArtists.map((artist, index) => (
          <div key={index}>
            <h3>{artist.name}</h3>
            <p>Genres: {artist.genres}</p>
            <p>Popularity: {artist.popularity}</p>
            <img src={artist.image_url} alt="Album Art" />
          </div>
        ))}
      </ul> */}