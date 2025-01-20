import React from 'react';
import Quiz from './Quiz';
import TextToSpeechSample from './TextToSpeechSample';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';



function AGame({ examFile }) {

  const [video, setVideo] = useState('');
  const [questions, setQuestions] = useState([]);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    fetch(`/${examFile}`)
      .then((response) => response.json())
      .then((data) => {
        console.log (`load data: ${examFile}`);
        setQuestions(data.questions);
        setVideo(atob(data.video));
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);



  const handleScoreUpdate = (score) => {
    setTotalScore((prevScore) => prevScore + score);
  };


  return (

    <div className="container mt-5">
      <div>ExampFile: {examFile}</div>
      <div style={{ padding: '20px' }}>
        <h2>View video and answer questions {totalScore}</h2>
        <iframe width="560" height="315" src={video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
      {questions.map((question) => (
        <Quiz question={question} onScoreUpdate={handleScoreUpdate} />
      ))}
    </div>
  );
}

export default AGame;
