import React, { Component } from 'react';
import moment from 'moment'

import powerConsumption from '../data/power_consumption.json';

import MonthlyErrorGraph from './MonthlyErrorGraph';
import MonthlyValuesGraph from './MonthlyValuesGraph';
import OverviewContainer from './OverviewContainer';
import TrendPredictionContainer from './TrendPredictionContainer';

import './App.css';

class App extends Component {

  static defaultProps = {
    // In a proper app would probably injest this via Redux/Relay
    powerConsumption: powerConsumption
  }

  constructor(props){
    super(props);
    this.state = {
      month: 6,
      year: 2008
    };

    // Janky ES6 modules need local 'this' bindings
    this.handleMonthlyDecrement = this.handleMonthlyDecrement.bind(this);
    this.handleMonthlyIncrement = this.handleMonthlyIncrement.bind(this);
  }

  get humanReadableDate(){
    const momentDate = moment().month(this.state.month).year(this.state.year);
    return momentDate.format("MMMM YYYY");
  }

  handleMonthlyDecrement() {
    if ((this.state.month === 11) && (this.state.year === 2006)){
      alert("Sorry, no more data");
      return false;
    }
    const momentDate = moment().month(this.state.month).year(this.state.year);

    // NB:  Mutates internal state
    momentDate.subtract(1, 'months');
    this.setState({'month': momentDate.toObject()['months'],
                   'year': momentDate.toObject()['years']})
  }

  handleMonthlyIncrement() {
    // TODO: Handle this more gracefully
    if ((this.state.month === 11) && (this.state.year === 2010)){
      alert("Sorry, no more data");
      return false;
    }

    const momentDate = moment().month(this.state.month).year(this.state.year);

    // NB: this mutate the internal state
    // Also, this is subtract as it seems
    // like momentJS's 'add' function is broken
    momentDate.subtract(-1, 'months');

    this.setState({'month': momentDate.toObject()['months'],
                   'year': momentDate.toObject()['years']})
  }

  powerConsumptionForYearMonth(year, month){
    // Filter out only data for the month
    // Assumes date format is:
    // {"Date":"2008-06-17" ....

    // Slightly weird regex here is because JS string interpolation
    // +1 are to align momentJS's 0-index time with human 1-indexed time
    const stringifiedMonth = (month+1) >= 10 ? (month+1).toString() : "0" + (month+1).toString()
    const matchingRegex = new RegExp(`${year}-${stringifiedMonth}-.*`)
    return this.props.powerConsumption.filter((datum) => {
      return matchingRegex.test(datum['Date'])
    });
  }

  render() {
    const monthlyPowerConsumptionData = this.powerConsumptionForYearMonth(this.state.year, this.state.month)
    return (
      <div className="app">
        <div className="app-header">
          <h2>Acme Corp. report for {this.humanReadableDate}</h2>
        </div>

      {/* TODO: Refactor this into extra component*/}
        <div className="app-nav">
          <span className="nav-title">
          {this.humanReadableDate}
          </span>
          <span className="nav-labels" onClick={this.handleMonthlyDecrement}>
            <i className="fa fa-arrow-left" aria-hidden="true" onClick={this.handleMonthlyDecrement}></i>
            <span>Previous Month</span>
          </span>

          <span className="nav-labels" onClick={this.handleMonthlyIncrement}>
           <span>Next Month</span>
            <i className="fa fa-arrow-right" aria-hidden="true" onClick={this.handleMonthlyIncrement}></i>
          </span>
        </div>

         <TrendPredictionContainer powerConsumptionData={this.props.powerConsumption}
                                   month={this.state.month}
                                   year={this.state.year}/>
         <OverviewContainer powerConsumptionData={monthlyPowerConsumptionData}/>
         <MonthlyErrorGraph powerConsumptionData={monthlyPowerConsumptionData} />
         <MonthlyValuesGraph powerConsumptionData={monthlyPowerConsumptionData} />

        {/* TODO: Refactor this */}
         <div className="app-nav bottom-nav">
          <span className="nav-title">
          {this.humanReadableDate}
          </span>
          <span className="nav-labels" onClick={this.handleMonthlyDecrement}>
            <i className="fa fa-arrow-left" aria-hidden="true" onClick={this.handleMonthlyDecrement}></i>
            <span>Previous Month</span>
          </span>

          <span className="nav-labels" onClick={this.handleMonthlyIncrement}>
           <span>Next Month</span>
            <i className="fa fa-arrow-right" aria-hidden="true" onClick={this.handleMonthlyIncrement}></i>
          </span>
        </div>

      </div>
    );
  }
}



export default App;
