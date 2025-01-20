// src/App.js
import React from 'react';
import Header from './components/Header';
import Quiz from './components/Quiz';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';



function App() {

  const [questions, setQuestions] = useState([]);
  const [totalScore, setTotalScore] = useState(0);;

  useEffect(() => {
    fetch('/question.json') // If stored in the public folder
      .then((response) => response.json()) // Parsing JSON data
      .then((data) => setQuestions(data)) // Storing data in state
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleScoreUpdate = (score) => {
    setTotalScore((prevScore) => prevScore + score);
  };

  return (
    <div className="container mt-5">


      <Header />

      <div>
        <h3>Total Score: {totalScore}</h3>
      </div>

      <div style={{ padding: '20px' }}>
        <h2>View video and answer questions</h2>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/l0Z8A4u3CtI?si=WZ-iLOZ2CGL7WAUm" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
      {questions.map((question) => (
        <Quiz question={question} onScoreUpdate={handleScoreUpdate}/>
      ))}
    </div>
  );
}

export default App;
