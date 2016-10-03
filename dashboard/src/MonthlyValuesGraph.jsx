import React, { Component } from 'react';
import {Line as LineChart} from 'react-chartjs-2';

class MonthlyValuesGraph extends Component {
  // TODO propTypes
  // TODO defaultProps
  get recordedDataToRender(){
    const recordedData = this.props.powerConsumptionData.map((datum)=>{
      return Math.abs(datum['glb_act_pwr_mean']);
    });

    const formattedDates = this.props.powerConsumptionData.map((datum)=>{
      return new Date(datum['Date']).getDate();
    });

    return {formattedDates, recordedData}
  }

  get forcastedDataToRender(){
    const forcastedData = this.props.powerConsumptionData.map((datum)=>{
      if (typeof(datum['glb_act_pwr_forecast']) !== "number") {
        return null;
      } else {
        return Math.abs(datum['glb_act_pwr_forecast']);
      }
    });

    const formattedDates = this.props.powerConsumptionData.map((datum)=>{
      return new Date(datum['Date']).getDate();
    });

    return {formattedDates, forcastedData}
  }

  render() {
    const chartOptions = {
      scales: {
        yAxes: [{
            ticks: {
              beginAtZero: true,
              max: 3,
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
    const data = {
      labels: this.recordedDataToRender['formattedDates'],
      datasets: [{
          label: "Recorded Power",
          fill: false,
          data: this.recordedDataToRender['recordedData'],
          spanGaps: true,
          backgroundColor: "white",
          borderColor: "green"
        },{
          label: "Forcasted Power",
          fill: false,
          data: this.forcastedDataToRender['forcastedData'],
          spanGaps: false,
          borderColor: "blue"
        }
      ]
    };
    return (
      <div className="monthly-values-graph">
        <LineChart data={data}
                   options={chartOptions}
                   height={300}
                   maintainAspectRatio={false}
                   width={(window.innerWidth-100)}/>
      </div>
    );
  }
}

export default MonthlyValuesGraph;
