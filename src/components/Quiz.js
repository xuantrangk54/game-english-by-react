import React, { useState } from 'react'
import TextToSpeech from './TextToSpeech';

function Quiz({ question, onScoreUpdate}) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);
    const handleSelectOption = (index) => { setSelectedOption(index); };

    const checkAnswer = () => {
        if (selectedOption !== null) {
            const isAnswerCorrect = question.options[selectedOption].isCorrect;
            setIsCorrect(isAnswerCorrect);
            setIsChecked(true);
            if (isAnswerCorrect) {
                onScoreUpdate(1);
            }
        }
    };
    return (
        <div className="container mt-5">
            <h1 className="mb-4">{question.text} <TextToSpeech text={question.text}/></h1>
            
            <form>
                {question.options.map((option, index) => (
                    <div key={index} className="form-check">
                        <input
                            type="radio"
                            id={`option-${index}`}
                            name="answer"
                            className="form-check-input"
                            value={index}
                            checked={selectedOption === index}
                            onChange={() => handleSelectOption(index)}
                            disabled={isChecked} 
                        />
                        <label htmlFor={`option-${index}`} className="form-check-label">{option.text} <TextToSpeech text={option.text}/>
                        </label>
                    </div>
                ))}
            </form>

            <button className="btn btn-primary mt-3" onClick={checkAnswer} disabled={isChecked}>
                Check Answer
            </button>

            {isChecked && (
                <div className="mt-3">
                    {isCorrect ? (
                        <p className="text-success">Correct!</p>
                    ) : (
                        <p className="text-danger">
                            Incorrect. The correct answer is: {question.options.find(option => option.isCorrect).text}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
export default Quiz;