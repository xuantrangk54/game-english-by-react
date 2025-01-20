import React, { useState, useEffect } from "react";

const TextToSpeechSample = () => {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [text, setText] = useState("Hello! This is a sample text-to-speech demo.");

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);

      if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0].name); // Mặc định chọn giọng đầu tiên
      }
    };

    // Lắng nghe sự kiện voiceschanged để đảm bảo giọng được tải
    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      speechSynthesis.onvoiceschanged = null; // Dọn dẹp sự kiện khi component unmount
    };
  }, []);

  const handleSpeak = () => {
    if (!text || !voices.length) {
      alert("No text or voices available to speak.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    // Tìm giọng được chọn
    const voice = voices.find((v) => v.name === selectedVoice);
    if (voice) {
      utterance.voice = voice;
    }

    // Đọc văn bản
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Text-to-Speech Demo</h1>
      <div className="mb-3">
        <label htmlFor="voiceSelect" className="form-label">
          Select Voice:
        </label>
        <select
          id="voiceSelect"
          className="form-select"
          value={selectedVoice}
          onChange={(e) => setSelectedVoice(e.target.value)}
        >
          {voices.map((voice, index) => (
            <option key={index} value={voice.name}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="textInput" className="form-label">
          Text to Read:
        </label>
        <textarea
          id="textInput"
          className="form-control"
          rows="3"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <button className="btn btn-primary" onClick={handleSpeak}>
        Speak
      </button>
    </div>
  );
};

export default TextToSpeechSample;