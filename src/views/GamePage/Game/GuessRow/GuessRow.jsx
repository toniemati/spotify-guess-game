import './GuessRow.css';

const GuessRow = ({ track, handleGuess }) => {
  return (
    <div onClick={() => handleGuess(track.track.id)} className="guessRow">
      {track.track.name}
    </div>
  )
}

export default GuessRow
