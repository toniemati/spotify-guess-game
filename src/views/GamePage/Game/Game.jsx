import './Game.css';
import { useStateValue } from '../../../StateProvider';
import { useEffect, useState } from 'react';

const Game = ({ playlist, difficulty }) => {
  const [{ spotify }] = useStateValue();
  const [tracks, setTracks] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  const [fourTracks, setFourTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [usedTracks, setUsedTracks] = useState([]);

  const [audio, setAudio] = useState(new Audio());
  const [interval, setInterval] = useState(null);

  const handleStartGame = () => {
    console.log('start game');
    setGameStarted(true);

    setNewFourTracks();
    playTrack();
  }

  const playTrack = () => {
    const idx = Math.floor(Math.random() * fourTracks.length);
    const track = fourTracks[idx];

    if (usedTracks.includes(track)) {
      setNewFourTracks();
      playTrack();
      return;
    }

    setUsedTracks([...usedTracks, track]);
    setAudio(audio.src = track.track.preview_url);
    audio.volume = 0.2;
    audio.play();
  }

  const setNewFourTracks = () => {
    const tempFourTracks = [];
    
    while (fourTracks.length < 4) {
      const idx = Math.floor(Math.random() * tracks.length);
      const track = tracks[idx];
      if (!fourTracks.includes(track))
        fourTracks.push(track);
    }

    setFourTracks(tempFourTracks);
  }

  useEffect(() => {
    const getTracks = async () => {
      let tempTracks = [];

      for (let i = 0; i < playlist.tracks.total; i += 100) {
        const { items } = await spotify.getPlaylistTracks(playlist.id, { limit: 100, offset: i });
        tempTracks = [...tempTracks, ...items];
      }
      setTracks(tempTracks);
    }
    getTracks();
  }, []);

  return (
    <div className="game">
      <div className="game__info">
        <h2>{playlist.name}</h2>
        •
        <h2>{difficulty.name}</h2>
      </div>

      {!gameStarted &&
        <button onClick={handleStartGame} className="game__startButton">Start</button>
      }

      {gameStarted &&
        <h1>Playing</h1>
      }
    </div>
  )
}

export default Game
