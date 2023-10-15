import './index.css';
import UserProfile from './UserProfile';
import TopArtists from './TopArtists';
import TopTracks from './TopTracks';
import SavedTracks from './SavedTracks';
import HistogramChart from './ChartTrack';
import Genre from './Genre';

function Home({ children }) {

  return (
    <div className="bg-gray-900">
      <UserProfile />  {/* Display the user profile component */}
      <TopArtists />
      <TopTracks />  {/* Display the top tracks component */}
      <HistogramChart />
      <Genre />
    </div>
  );
}

export default Home;
