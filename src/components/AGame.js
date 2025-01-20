import React from 'react';
import Quiz from './Quiz';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import TextToSpeech from './TextToSpeech';


function AGame({ examFile, showResultGame }) {

  const [video, setVideo] = useState('');
  const [questions, setQuestions] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [totalAnsered, setTotalAnsered] = useState(0);

  useEffect(() => {
    fetch(`/${examFile}`)
      .then((response) => response.json())
      .then((data) => {
        console.log (`load data: ${examFile}`);
        setQuestions(data.questions);
        setVideo(atob(data.video));
      })
      .catch((error) => console.error('Error fetching data:', error));
  });

  const handleScoreUpdate = (score) => {
    setTotalScore ((prevScore) => prevScore + score);
    var newScore = totalScore + score;
    var newData = totalAnsered+1;
    setTotalAnsered (newData);
    if (newData===questions.length) {
      showResultGame (newScore);
    }
  };

  return (
    <div className="container mt-5">
      <div style={{ padding: '20px' }}>
        <h2>View video and answer questions <TextToSpeech text="View video and answer questions"/></h2>
        <iframe width="560" height="315" src={video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
      {questions.map((question) => (
        <Quiz key={question.id} question={question} onScoreUpdate={handleScoreUpdate} />
      ))}
    </div>
  );
}

export default AGame;
