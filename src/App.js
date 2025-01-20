// src/App.js
import React from 'react';
import GameList from './components/GameList';
import AGame from './components/AGame'
import TextToSpeechSample from './components/TextToSpeechSample';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';



function App() {


  const [gameOption, setGameOption] = useState('');

  useEffect(() => {
  }, []);


  const hanldeUpdateGameOption = (gameOption) => {
    setGameOption(gameOption);
  };

  return (
    <div className="container mt-5">
      <GameList hanldeUpdateGameOption={hanldeUpdateGameOption}></GameList>
      <div>
        <h3>Game: {gameOption}</h3>
      </div>
      {(gameOption) ? <AGame examFile={gameOption}></AGame> : <p>NoGame</p>}
    
    </div>
  );
}

export default App;
