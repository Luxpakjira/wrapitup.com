import React, { useEffect, useState } from 'react';
import './index.css';
function SavedTracks() {
  const [savedTracks, setSavedTracks] = useState([]);

  useEffect(() => {
    fetch('/getTracks')
      .then((response) => response.json())
      .then((data) => {
        setSavedTracks(data.songs);
      })
      .catch((error) => {
        console.error('Error fetching saved tracks:', error);
      });
  }, []);

  return (
    <div>
      <h2>Saved Tracks</h2>
      <ul>
        {savedTracks.map((track, index) => (
          <div key={index}>
            <h3>{track.name}</h3>
            <p>Artist: {track.artist}</p>
            <p>Album: {track.album}</p>
            <img src={track.image_url} alt="Album Art" />
          </div>
        ))}
      </ul>
    </div>
  );
}

export default SavedTracks;
