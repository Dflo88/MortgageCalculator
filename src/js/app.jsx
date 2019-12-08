import React from 'react';

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      balValue: "",
      rateValue: "",
      termValue: 15,
      monthlyPayment: ""
    }
    this.handleBalChange = this.handleBalChange.bind(this);
    this.handleRateChange = this.handleRateChange.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.calculate = this.calculate.bind(this);
    
  }
  handleBalChange(event){
    this.setState({balValue: event.target.value});
  }
  handleRateChange(event){
    this.setState({rateValue: event.target.value});
  }
  handleTermChange(event){
    this.setState({termValue: event.target.value});
  }
  
  calculate(){
    const monthlyRate = (this.state.rateValue/12)/100;
    const monthlyTerms = this.state.termValue*12;
    var mortgage = (this.state.balValue)*(((Math.pow((1+monthlyRate),monthlyTerms))*monthlyRate)/((Math.pow((1+monthlyRate),monthlyTerms))-1));
    this.setState({monthlyPayment: `$ ${mortgage.toFixed(2)} is your payment.`});
  }
  render() {
    

    return (
      <div className='container'>
        <h1>Mortgage Calculator</h1>
        {<input name="balance" type="number" placeholder="Current Balance" value={this.state.balValue} onChange={this.handleBalChange}/>}
        {<input name="rate" type="number" step="0.01" placeholder="Current Rate" value={this.state.rateValue} onChange={this.handleRateChange}/>}
        {<select name="term" placeholder="Terms in Years" value={this.state.termValue} onChange={this.handleTermChange}>
          <option>15</option>
          <option>30</option>
          </select>}
        {<button name="submit" onClick={this.calculate}>Calculate Mortgage Payment</button>}
        {<div name="output" id="output" >{this.state.monthlyPayment}</div>}
      </div>
    );
  }
}
