// src/App.js
import React from 'react';
import GameList from './components/GameList';
import AGame from './components/AGame'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';



function App() {

  const [gameOption, setGameOption] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
  }, []);


  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const showResultGame = (totalScore) => {
    setTotalScore (totalScore);
    setModalOpen(true);
  }

  const hanldeUpdateGameOption = (gameOption) => {
    setGameOption(gameOption);
  };

  const GameResultModal = ({ isOpen, onClose, children }) => {
    return (
      <div className={`modal ${isOpen ? 'd-block' : 'd-none'}`} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Kết quả trò chơi</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={onClose}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mt-5">
      <GameList hanldeUpdateGameOption={hanldeUpdateGameOption}></GameList>
      {(gameOption) ? <AGame key={gameOption} examFile={gameOption} showResultGame={showResultGame}></AGame> : <p>NoGame</p>}

      <button className="btn btn-success" onClick={handleOpenModal}>
        Hiển thị kết quả
      </button>

      <GameResultModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <p>Chúc mừng! Bạn đã chiến thắng với số điểm: {totalScore} !</p>
      </GameResultModal>

    </div>
  );
}

export default App;
