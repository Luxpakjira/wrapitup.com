import React, { useEffect, useState } from 'react';
import { Chart } from 'chart.js/auto';


function HistogramChart() {
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/getTopTracks?time_range=long_term');
        const data = await response.json();
        setTopTracks(data.top_tracks);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (topTracks.length > 0) {
      // Count the frequency of 'popularity' values
      const popularityCounts = {};
      topTracks.forEach((track) => {
        const popularity = track.popularity;
        if (popularityCounts[popularity]) {
          popularityCounts[popularity]++;
        } else {
          popularityCounts[popularity] = 1;
        }
      });

      // Prepare data for the chart
      const labels = Object.keys(popularityCounts);
      const counts = labels.map((popularity) => popularityCounts[popularity]);

      // Create a bar chart
      const ctx = document.getElementById('popularityHistogram').getContext('2d');

      if (window.myChart) {
        window.myChart.destroy();
      }

      window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Popularity',
              data: counts,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Popularity', // X-axis label
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Frequency', // Y-axis label
                },
              },
            },
          },        
      });
    }
  }, [topTracks]);

  return (
    <div>
        <h2 className='self-center text-6xl font-semibold text-white'>How popular the songs you listen to are?</h2>
        <div className='mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden my-8 md:max-w-xl'>     
            <canvas id="popularityHistogram" width="400" height="200"></canvas>
        </div>




    </div>
  );
}

export default HistogramChart;


