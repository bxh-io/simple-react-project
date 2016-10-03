import React, { Component } from 'react';

import OverviewPlaque from './OverviewPlaque';

class OverviewContainer extends Component {

  get averageMonthlyError(){
    const filteredErrorsArray = this.props.powerConsumptionData.map((datum) => {
        return datum['glb_act_pwr_forecast_error']
    }).filter((datum) =>{
        return (typeof datum === "number" && !isNaN(datum))
    });

    const sumOfErrors = filteredErrorsArray.reduce((x,y)=>{
        return Math.abs(x) + Math.abs(y)
    }, 0);

    return sumOfErrors/filteredErrorsArray.length;
  }

  get bestPrediction(){
    const errorsArray = this.props.powerConsumptionData.map((datum) => {
        return Math.abs(datum['glb_act_pwr_forecast_error'])
    }).filter((datum) => {
        return (typeof datum === "number" && !isNaN(datum))
    });
    return errorsArray.sort()[0]
  }

  get worstPrediction(){
    const errorsArray = this.props.powerConsumptionData.map((datum) => {
        return Math.abs(datum['glb_act_pwr_forecast_error'])
    }).filter((datum) => {
        return (typeof(datum) === "number" && !isNaN(datum))
    });
    return errorsArray.sort()[errorsArray.length-1]
  }

  get errorStandardDeviation(){
    const averageError = this.averageMonthlyError;

    const squareDiffs = this.props.powerConsumptionData.map((datum)=>{
        return datum['glb_act_pwr_forecast_error'];
    }).filter((datum) => {
        return (typeof datum === "number")
    }).map(function(error){
        const difference = error - averageError;
        return difference * difference;
    });

    const sumSquareDiff = squareDiffs.reduce((x,y) => {
        return Math.abs(x) + Math.abs(y)
    }, 0);

    const averageSquareDifference = sumSquareDiff/squareDiffs.length;

    return Math.sqrt(averageSquareDifference);
  }

  render(){
    return(<div className="overview">
              <div className="overview-title"> Monthly overview </div>
              <div className="overview-container">
                <OverviewPlaque label="Average power prediction error  this month" value={this.averageMonthlyError}/>
                <OverviewPlaque label="Smallest power prediction error this month" value={this.bestPrediction}/>
                <OverviewPlaque label="Largest power predictionerror this month this month" value={this.worstPrediction}/>
                <OverviewPlaque label="Standard deviation in power prediction error this month" value={this.errorStandardDeviation}/>
              </div>
            </div>)
  }
}

export default OverviewContainer;
