import { useState } from 'react';
import './GamePage.css';
import Game from './Game/Game';
import SelectDifficulty from './SelectDifficulty/SelectDifficulty';
import SelectPlaylist from './SelectPlaylist/SelectPlaylist';
import SelectVolume from './SelectVolume/SelectVolume';

const GamePage = () => {
  const [playlist, setPlaylist] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [volume, setVolume] = useState(0);

  return (
    <div className="gamePage">
      {!playlist ? (
        <SelectPlaylist setPlaylist={setPlaylist} />
      ) : ''
      }

      {playlist && !difficulty ? (
        <SelectDifficulty setDifficulty={setDifficulty} />
      ) : ''
      }

      {playlist && difficulty && !volume ? (
        <SelectVolume setVolume={setVolume} playlist={playlist} />
      ) : ''
      }

      {playlist && difficulty && volume ? (
        <Game playlist={playlist} difficulty={difficulty} volume={volume} />
      ) : ''
      }
    </div>
  )
}

export default GamePage
