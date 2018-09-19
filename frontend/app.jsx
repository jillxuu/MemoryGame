import React from 'react';
import ReactDOM from 'react-dom';
import Game from './game';
import CountdownTimer from './timer';
import Footer from './footer';


const game = {size: 6};
document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <div>
      <CountdownTimer />
  	  <Game game={game}/>
      <Footer />
    </div>,
	  document.getElementById('main')
  );
});
