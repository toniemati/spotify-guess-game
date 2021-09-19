import { useStateValue } from '../../StateProvider';
import './HomePage.css';
import PlaylistCard from './PlaylistCard/PlaylistCard';

const HomePage = () => {
  const [{ playlists }] = useStateValue();
  console.log(playlists);

  return (
    <div className="homePage">
      <h1>Your playlists:</h1>

      <div className="homePage__playlists">
        {playlists.length && playlists.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </div>
  )
}

export default HomePage
