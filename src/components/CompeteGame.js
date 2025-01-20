import React from 'react';
import Quiz from './Quiz';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import TextToSpeech from './TextToSpeech';



function CompeteGame({ totalScore }) {

  useEffect(() => {
  }, []);

  return (
    <div>
      <h1> Your total score: {totalScore}</h1>
    </div>
  );
}

export default CompeteGame;
