import React from 'react';

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      balance: "",
      rate: "",
      term: 15,
      monthlyPayment: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.calculate = this.calculate.bind(this);
  }
  handleChange(event){
    this.setState({[event.target.name]: event.target.value});
  }
  calculate(){
    // monthlyRate will convert an annual percentage rate to a monthly percentage rate as a decimal.
    const monthlyRate = (this.state.rate/12)/100;
    // monthlyTerms converts the term in years to the number of monthly payments over the loan term.
    const monthlyTerms = this.state.term*12;
    // the variable mortgage uses the monthlyRate and monthlyTerms along with the principal balance to determine the monthly payment
    // the formula used in mortage is: M = P[r(1+r)^n/((1+r)^n)-1)]
    // where M is the total monthly mortgage payment
    // P is the principal loan amount
    // r is the monthly interest rate
    // n is the number of payments over the loan's lifetime
    var mortgage = (this.state.balance)*(((Math.pow((1+monthlyRate),monthlyTerms))*monthlyRate)/((Math.pow((1+monthlyRate),monthlyTerms))-1));
    this.setState({monthlyPayment: `$ ${mortgage.toFixed(2)} is your payment.`});
  }
  render() {
    return (
      <div className='container'>
        <h3>Mortgage Calculator</h3>
        {<input name="balance" type="number" placeholder="Current Balance" value={this.state.balance} onChange={this.handleChange}/>}
        {<input name="rate" type="number" step="0.01" placeholder="Current Rate" value={this.state.rate} onChange={this.handleChange}/>}
        {<select name="term" placeholder="Terms in Years" value={this.state.term} onChange={this.handleChange}>
          <option>15</option>
          <option>30</option>
          </select>}
        {<button name="submit" onClick={this.calculate}>Calculate Mortgage Payment</button>}
        {<div name="output" id="output" >{this.state.monthlyPayment}</div>}
      </div>
    );
  }
}
