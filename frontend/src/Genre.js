import React, { useEffect, useState } from 'react';

function App() {
  const [topArtists, setTopArtists] = useState([]);
  const [topGenres, setTopGenres] = useState([]);

  useEffect(() => {
    fetch('/getTopArtists')
      .then((response) => response.json())
      .then((data) => {
        setTopArtists(data.top_artists);

        // Count genres
        const genreCounts = {};
        data.top_artists.forEach((artist) => {
          artist.genres.forEach((genre) => {
            const genres = genre.split(' ');
            genres.forEach((g) => {
              genreCounts[g] = (genreCounts[g] || 0) + 1;
            });
          });
        });

        // Rank the genres
        const rankedGenres = Object.keys(genreCounts).sort(
          (a, b) => genreCounts[b] - genreCounts[a]
        );

        // Get the top 10 genres
        const top10Genres = rankedGenres.slice(0, 10);

        setTopGenres(top10Genres);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Top 10 Listened Genres</h1>
      <ul>
  {topGenres.map((genre, index) => (
    <li key={index}>{genre}</li>
  ))}
</ul>
    </div>
  );
}

export default App;
