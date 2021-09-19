import './PlaylistCard.css';

const PlaylistCard = ({ playlist }) => {
  return (
    <div className="playlistCard">
      <img src={playlist.images[0].url} alt={playlist.name} />

      <div className="playlistCard__name">{playlist.name}</div>
      <div className="playlistCard__songs">Songs: {playlist.tracks.total}</div>
      {playlist.description &&
        <div className="playlistCard__description">
          {playlist.description}
        </div>
      }
    </div>
  )
}

export default PlaylistCard
