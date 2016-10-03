import React, { Component } from 'react';
import {Line as LineChart} from 'react-chartjs-2';

class TrendGraph extends Component {
  // TODO propTypes
  // TODO defaultProps
  render() {
    const chartOptions = {
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            max: 1.2,
            fixedStepSize: 0.3
          },
          scaleLabel: {
            display: true,
            labelString: "Forcast error"
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: `${this.props.lengthOfTrend} day trend for day of the month`
          }
        }]
      }
    }

    const data = {
      labels: [...Array(this.props.trendData.length).keys()],
      datasets: [{
          label: `${this.props.lengthOfTrend} day trend`,
          fill: false,
          data: this.props.trendData,
          spanGaps: true,
          backgroundColor: "white",
          borderColor: "orange"
        }
      ]
    };
    return (
      <div className="trend-values-graph">
        <h3>Prediction error for forcasted power, averaged over {this.props.lengthOfTrend} days</h3>
        <LineChart data={data}
                   options={chartOptions}
                   height={130}
                   maintainAspectRatio={false}
                   width={(window.innerWidth-100)}/>
      </div>
    );
  }
}

export default TrendGraph;
