import React, { Component } from 'react';
import moment from 'moment';

import TrendGraph from './TrendGraph';
//Keep cache outside of component lifecycle
const movingWindowAverageCache = {};

class TrendPredictionContainer extends Component {

  _calculateAverageErrorForWindow(windowSlice) {
    const filteredWindow = windowSlice.map((datum)=>{
      return Math.abs(datum['glb_act_pwr_forecast_error'])
    }).filter((datum) => {
      return typeof(datum) === "number" && !isNaN(datum)
    })

    const sumOfFilteredWindow = filteredWindow.reduce((x, y) => {
      return x+y
    }, 0)

    return sumOfFilteredWindow/filteredWindow.length;
  }

  xDayMovingAverageFromDate(windowSize, day, month, year){
    let lowerWindowSize;
    const cacheKey = `${windowSize}-${day}-${month}-${year}`
    const matchingRegex = new RegExp(`${year}-\\d?${month}-\\d?${day}`)

    if (cacheKey in movingWindowAverageCache){
      return movingWindowAverageCache[cacheKey]
    } else {
      const matchingDatum = this.props.powerConsumptionData.find((datum, i) => {
          return matchingRegex.test(datum['Date'])
      })

      const indexOfDatum = this.props.powerConsumptionData.indexOf(matchingDatum)
      if (indexOfDatum > windowSize){
        lowerWindowSize = indexOfDatum - windowSize;
      } else {
        lowerWindowSize = 0;
      }
      const windowSlice = this.props.powerConsumptionData.slice(lowerWindowSize, indexOfDatum)
      const errorAverage = this._calculateAverageErrorForWindow(windowSlice)
      movingWindowAverageCache[cacheKey] = errorAverage
      return errorAverage;
    }
  }

  render(){
    const momentDate = moment().month(this.props.month).year(this.props.year)
    const numberOfDaysInCurrentMonth = momentDate.daysInMonth();
    const tenDayAverages = []
    const thirtyDayAverages = []
    for (var i = 1; i <= numberOfDaysInCurrentMonth; i++) {
      tenDayAverages.push(this.xDayMovingAverageFromDate(10, i, this.props.month, this.props.year).toFixed(3))
      thirtyDayAverages.push(this.xDayMovingAverageFromDate(30, i, this.props.month, this.props.year).toFixed(3))
    }


  	return(<div className="trend-container">
              <TrendGraph lengthOfTrend={10} trendData={tenDayAverages} />
              <TrendGraph lengthOfTrend={30} trendData={thirtyDayAverages} />
	        </div>)
  }
}

export default TrendPredictionContainer;
