import React from 'react';
import ReactDOM from 'react-dom';
import Card from './card';

const card = {value: 2, revealed: false};
document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Card card={card}/>,
	  document.getElementById('main')
  );
});
