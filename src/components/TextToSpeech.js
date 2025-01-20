import React from "react";

const TextToSpeech = ({ text }) => {

  // Kiểm tra nếu trình duyệt hỗ trợ Web Speech API
  const handleReadText = (event) => {
    event.preventDefault();
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text); // Tạo đối tượng SpeechSynthesisUtterance từ văn bản
      speechSynthesis.speak(utterance); // Đọc văn bản
    } else {
      alert("Sorry, your browser does not support text-to-speech.");
    }
  };

  return (
    <button onClick={handleReadText} className="btn btn-light btn-sm rounded-pill shadow-sm" >🔊 </button>
  );
};

export default TextToSpeech;
