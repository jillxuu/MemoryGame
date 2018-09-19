import React from 'react';


export default class Card extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: this.props.card.value, revealed: this.props.card.revealed};
      this.renderValue = this.renderValue.bind(this);
    }

    renderValue(){
      if (!this.props.card.revealed){
        return "#";
      }else {
        return this.props.card.value;
      }
    }

    render(){
      return (
        <div>{this.renderValue()}</div>
      );
    }
}
