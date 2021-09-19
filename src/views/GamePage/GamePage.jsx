import { useState } from 'react';
import './GamePage.css';
import Game from './Game/Game';
import SelectDifficulty from './SelectDifficulty/SelectDifficulty';
import SelectPlaylist from './SelectPlaylist/SelectPlaylist';

const GamePage = () => {
  const [playlist, setPlaylist] = useState(null);
  const [difficulty, setDifficulty] = useState(null);

  return (
    <div className="gamePage">
      {!playlist && 
        <SelectPlaylist setPlaylist={setPlaylist} />
      }

      {playlist && !difficulty && 
        <SelectDifficulty setDifficulty={setDifficulty} />
      }

      {playlist && difficulty && 
        <Game playlist={playlist} difficulty={difficulty} />
      }
    </div>
  )
}

export default GamePage
