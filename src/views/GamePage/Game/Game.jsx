import './Game.css';
import { useStateValue } from '../../../StateProvider';
import { useEffect, useRef, useState } from 'react';
import LoopIcon from '@material-ui/icons/Loop';

const Game = ({ playlist, difficulty }) => {
  const [{ spotify }] = useStateValue();
  const [tracks, setTracks] = useState([]);
  
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isTimerStarted, setIsTimerStared] = useState(false);
  const [isGuessing, setIsGuessing] = useState(false);

  const [usedTracks, setUsedTracks] = useState([]);
  const [currentFourTracks, setCurrentFourTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  
  const [maxRound, setMaxRound] = useState(10);
  const [round, setRounds] = useState(0);
  const [points, setPoints] = useState(0);
  const audio = useRef(null);

  const gameLoop = () => {
    if (round >= maxRound) {
      stopAudio();
      return;
    }

    setRounds(round + 1);

    const fourTracks = getFourTracks();
    const track = getOneTrack(fourTracks);

    if (usedTracks.includes(track)) {
      console.log('include');
      gameLoop();
      return;
    }

    console.log('not include');
    
    setCurrentFourTracks(fourTracks);
    setCurrentTrack(track);
    setUsedTracks(usedTracks => [...usedTracks, track]);

    audio.current.src = track.track.preview_url;
    audio.current.volume = 0.2;
    setIsTimerStared(true);
    audio.current.play();
    
  }

  const handleGuess = (trackId) => {
    setIsGuessing(true);
    setIsTimerStared(false);
    if (trackId === currentTrack.track.id) {
      setPoints(points + 1);
    }

    gameLoop();
  }

  const getOneTrack = (tracks) => {
    const idx = Math.floor(Math.random() * tracks.length);
    const track = tracks[idx];

    return track;
  }

  const getFourTracks = () => {
    const fourTracks = [];

    while (fourTracks.length < 4) {
      const idx = Math.floor(Math.random() * tracks.length);
      const track = tracks[idx];

      if (!fourTracks.includes(track))
        fourTracks.push(track);
    }

    return fourTracks;
  }

  const stopAudio = () => {
    if (
      audio.current.src &&
      !audio.current.paused
    )
      audio.current.pause();
  }

  //* Timer interval
  useEffect(() => {
    if (!isTimerStarted) return;

    let timer = 0;

    const interval = setInterval(() => {
      if (isGuessing) {
        clearInterval(interval);
        setIsGuessing(false);
        return;
      } else if (timer > difficulty.time) {
        clearInterval(interval);
        handleGuess();
        return;
      }

      console.log(timer);
      timer++;
    }, 1000);

    return () => clearInterval(interval);

  }, [isTimerStarted, isGuessing]);

  //* Check Game State
  useEffect(() => {
    if (!isGameStarted) return;

    if (tracks.length < 10)
      setMaxRound(tracks.length);

    gameLoop();
  }, [isGameStarted]);

  //* Getting tracks from api
  useEffect(() => {
    const getTracks = async () => {
      let tempTracks = [];

      for (let i = 0; i < playlist.tracks.total; i += 100) {
        const { items } = await spotify.getPlaylistTracks(playlist.id, { limit: 100, offset: i });
        tempTracks = [...tempTracks, ...items.filter((item) => item.track.preview_url)];
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

      {!tracks.length && (
        <LoopIcon className="game__loopIcon" />
      )}

      {(!isGameStarted && tracks.length) ?
        <button onClick={() => setIsGameStarted(true)} className="game__startButton">Start {tracks.length}</button> :
        ''
      }

      {isGameStarted &&
        <div>
          <p>round: {round}</p>
          <p>points: {points}</p>

          {isTimerStarted && (
            <div>
              {currentFourTracks.map((track) => (
                <p onClick={() => handleGuess(track.track.id)} key={track.track.id}>{track.track.name}</p>
              ))}
            </div>
          )}
        </div>
      }

      <audio ref={audio} />
    </div>
  )
}

export default Game
