import React from 'react';
import ReactDOM from 'react-dom';
import Game from './game';

const game = {size:2};
document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Game game={game}/>,
	  document.getElementById('main')
  );
});
