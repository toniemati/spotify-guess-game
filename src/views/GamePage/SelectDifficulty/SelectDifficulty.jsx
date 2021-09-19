import { useState } from 'react';
import './SelectDifficulty.css';

const SelectDifficulty = ({ setDifficulty }) => {
  const [difficulties] = useState([
    {
      name: 'Ease',
      time: 10
    },
    {
      name: 'Normal',
      time: 5
    },
    {
      name: 'Hard',
      time: 3
    }
  ]);
  
  return (
    <div className="selectDifficulty">
      <h1>Select difficulty</h1>

      <div className="selectDifficulty__list">
        {difficulties.map((difficulty) => (
          <div
            className="selectDifficulty__item"
            key={difficulty.name}
            onClick={() => setDifficulty(difficulty)}
          >
            {difficulty.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SelectDifficulty
