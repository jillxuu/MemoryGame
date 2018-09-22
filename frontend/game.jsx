import React from 'react';
import Card from './card';

export default class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {size: this.props.game.size,board: populate(this.props.game.size),
    firstPos: null, secondPos: null, noMatch: false,
    currScore: 50,
    bestScore: 0};

    this.makeGuess = this.makeGuess.bind(this);
    this.won = this.won.bind(this);
    this.lost = this.lost.bind(this);
    this.reset = this.reset.bind(this);
    this.difficulty = this.difficulty.bind(this);
  }

  //underlying memory game logic, flip first card if there is no card flipped
  // flip second card if first card is flipped, match two flipped cards
  //if match, keep both up, if not, flip both back
  makeGuess(pos){
    if (!this.state.board[pos[0]][pos[1]].revealed){
      if (this.state.firstPos === null){
        this.state.board[pos[0]][pos[1]].revealed = true;
        this.setState({noMatch: false, board: this.state.board, firstPos: pos});
      } else {
        this.state.board[pos[0]][pos[1]].revealed = true;
        if (this.compare(pos)){
          this.setState({currScore: this.state.currScore + 5, noMatch: false, board: this.state.board, firstPos: null});
        } else {
          this.setState({noMatch: true, board: this.state.board, secondPos: pos});
        }
      }
      if (this.state.noMatch){
        this.state.board[this.state.firstPos[0]][this.state.firstPos[1]].revealed = false;
        this.state.board[this.state.secondPos[0]][this.state.secondPos[1]].revealed = false;
        this.setState({currScore: this.state.currScore - 3, noMatch: false, board: this.state.board, firstPos: pos, secondPos: null});
      }
    }
  }

  //compare whether two cards are a match
  compare(pos){
    if (this.state.board[pos[0]][pos[1]].value === this.state.board[this.state.firstPos[0]][this.state.firstPos[1]].value){
      return true;
    }
    return false;
  }
  won(){
    for (let i = 0; i < this.state.size; i++){
      for (let j = 0; j < this.state.size; j++){
        if (this.state.board[i][j].revealed === false){
          return false;
        }
      }
    }
    return true;
  }

  lost(){
    if (this.state.currScore < 0){
      return true;
    }
    return false;
  }

  renderText(){
    if (this.won()){
      this.state.bestScore = this.state.bestScore > this.state.currScore ? this.state.bestScore : this.state.currScore;
      return "You won, congrats";
    } else if (this.lost()){
      return "You lost, sorry";
    }
  }

  reset(e){
    e.preventDefault();
    this.setState({size: this.props.game.size,
      firstPos: null,
      secondPos: null,
      board: populate(this.props.game.size),
      currScore: 50,
      bestScore: 0
    });
  }

  difficulty(level){
    switch (level){
      case 1:
        this.setState({
          size: 6,
          firstPos: null,
          secondPos: null,
          board: populate(6)
        });
        break;
      case 2:
        this.setState({
          size: 8,
          firstPos: null,
          secondPos: null,
          board: populate(8)
        });
        break;
      case 3:
        this.setState({
          size: 10,
          firstPos: null,
          secondPos: null,
          board: populate(10)
        });
        break;
    }

  }

  render(){
    return (
      <div>
        <div className="head">
          <div className="left">
            <p className="curr">Current Score: {this.state.currScore}</p>
            <p className="best">Best Score: {this.state.bestScore}</p>
            <p className="message">{this.renderText()}</p>
          </div>
          <div className="button">
            <button className="button1" onClick={(e)=>this.reset(e)}>RESET</button>
            <button className="button2" onClick={()=>this.difficulty(1)}>Easy</button>
            <button className="button3" onClick={()=>this.difficulty(2)}>Medium</button>
            <button className="button4" onClick={()=>this.difficulty(3)}>Hard</button>
          </div>
        </div>
        <div className="board">
          {this.state.board.map((cardRows,rIdx)=>
            {return cardRows.map((card, cIdx)=>{
                return <span onClick={()=>this.makeGuess([rIdx, cIdx])}><Card card={this.state.board[rIdx][cIdx]}/></span>;
              });}
            )}
        </div>
      </div>
  );}

}

function populate(size){
  const VALUES = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  let values = VALUES;
  size = size * size / 2;

  while (size > values.length){
    values = values.concat(values);
  }
  values = shuffle(values);
  values = values.slice(0,size).concat(values.slice(0,size));
  values = shuffle(values);
  let array = new Array(Math.sqrt(size * 2)).fill(0).map(() => new Array(Math.sqrt(size * 2)).fill(0));
  let idx = 0;
  for (let i = 0; i < Math.sqrt(size * 2); i++){
    for (let j = 0; j < Math.sqrt(size * 2); j++){
      let card = {value: values[idx], revealed: false};
      idx++;
      array[i][j] = card;
    }
  }
  return array;
}

function shuffle(array){
  let counter = array.length;

  while (counter > 0) {
      let index = Math.floor(Math.random() * counter);
      counter--;
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
  }
  return array;
}
