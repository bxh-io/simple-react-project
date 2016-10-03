import React, { Component } from 'react';

import {Line as LineChart} from 'react-chartjs-2';

class MonthlyErrorGraph extends Component {

  get errorDataToRender(){
    const errors = this.props.powerConsumptionData.map((datum)=>{
      if (typeof(datum['glb_act_pwr_forecast_error']) !== "number") {
        return null;
      } else {
        return Math.abs(datum['glb_act_pwr_forecast_error']);
      }
    });

    const formattedDates = this.props.powerConsumptionData.map((datum)=>{
      return new Date(datum['Date']).getDate();
    });

    return {formattedDates, errors}
  }

  render() {
    const chartOptions = {
        scales: {
            yAxes: [{
                ticks: {
                  beginAtZero: true,
                  max: 1.6,
                  fixedStepSize: 0.2
                },
                scaleLabel: {
                  display: true,
                  labelString: "Forcast error"
                }
            }],
            xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: "Day of the month"
                }
            }]

        }
    }
    const chartData = {
      labels: this.errorDataToRender['formattedDates'],
      datasets: [{
          label: "Prediction Forcast Error",
          fill: false,
          data: this.errorDataToRender['errors'],
          spanGaps: true,
          backgroundColor: "white",
          borderColor: "red"
        }
      ]
    };
    return (
      <div className="monthly-error-graph">
        <div className="error-graph-header">Daily breakdown of prediction errors</div>
        <LineChart data={chartData}
                   options={chartOptions}
                   height={250}
                   maintainAspectRatio={false}
                   width={(window.innerWidth-100)}/>
      </div>
    );
  }
}


export default MonthlyErrorGraph;
