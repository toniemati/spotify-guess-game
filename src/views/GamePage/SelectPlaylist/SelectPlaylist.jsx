import './SelectPlaylist.css';
import { useStateValue } from '../../../StateProvider';

const SelectPlaylist = ({ setPlaylist }) => {
  const [{ playlists }] = useStateValue();

  return (
    <div className="selectPlaylist">
      <h1>Select playlist</h1>

      <div className="selectPlaylist__playlists">
        {playlists.map((playlist) => (
          <div
            className="selectPlaylist__item"
            key={playlist.id}
            onClick={() => setPlaylist(playlist)}
          >
            {playlist.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SelectPlaylist
