import React from 'react';

const GameList = ({hanldeUpdateGameOption}) => {
    return (
        <div>
            <div class="container my-4">
                <h1 class="text-center mb-4">Danh sách các game</h1>
                <div class="row g-3">
                    <div class="col-6 col-sm-4 col-md-3 col-lg-2">
                        <button class="btn btn-primary w-100" onClick={()=>{hanldeUpdateGameOption('question-the-wind-and-the-sun.json')}}>The wind and the sun</button>
                    </div>
                    <div class="col-6 col-sm-4 col-md-3 col-lg-2">
                        <button class="btn btn-primary w-100" onClick={()=>{hanldeUpdateGameOption('the-little-red-hen.json')}}>The little red hen</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameList;