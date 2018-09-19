import React from 'react';
import ReactDOM from 'react-dom';
import Game from './game';
import CountdownTimer from './timer';


const game = {size:2};
document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <div>
      <CountdownTimer />
  	  <Game game={game}/>
    </div>,
	  document.getElementById('main')
  );
});
