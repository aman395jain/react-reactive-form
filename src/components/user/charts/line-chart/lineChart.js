import React from "react";
import { Line } from "react-chartjs-2";

import "../_chart.scss";

export default class lineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lineChartData: {}
    };
  }

  getLineChartData() {
    const dataFirst = {
      label: "Engine",
      fill: "false",
      lineTension: 0.5,
      backgroundColor: "rgb(75,192,192)",
      borderColor: "rgb(75,192,192)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgb(75,192,192)",
      pointBackgroundColor: "rgb(75,192,192)",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgb(75,192,192)",
      pointHoverBorderColor: "rgb(220,220,220)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 20, 80, 45, 67, 34, null]
    };
    const dataSecond = {
      label: "Gear",
      fill: 1,
      lineTension: 0.5,
      backgroundColor: "rgb(255, 00, 00)",
      borderColor: "rgb(255, 00, 00)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgb(255, 00, 00)",
      pointBackgroundColor: "rgb(255, 00, 00)",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgb(255, 00, 00)",
      pointHoverBorderColor: "rgb(255, 00, 00)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [81, 56, 76, 34, 45, 23, null]
    };
    const dataThird = {
      label: "Wheel",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgb(62, 57, 57)",
      borderColor: "rgb(62, 57, 57)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgb(62, 57, 57)",
      pointBackgroundColor: "rgb(62, 57, 57)",
      pointBorderWidth: 5,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgb(62, 57, 57)",
      pointHoverBorderColor: "rgb(62, 57, 57)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [55, 65, 59, 81, 56, 80, null]
    };

    const data = {
      labels: ["2017", "2018", "2019", "2020", "2021", "2022", ""],
      datasets: [dataFirst, dataSecond]
    };
    this.setState({
      lineChartData: data
    });
  }

  componentDidMount() {
    this.getLineChartData();
  }

  render() {
    // Chart.plugins.register({
    //   afterUpdate: function(chart) {
    //     let offset = 17;
    //     let model = null;
    //     for (let i = 0; i < chart.config.data.datasets.length; i++) {
    //       for (let j = 0; j < chart.config.data.datasets[i].data.length; j++) {
    //         model = chart.config.data.datasets[i]._meta[0].data[j]._model;
    //         model.x += offset;
    //         model.controlPointNextX += offset;
    //         model.controlPointPreviousX += offset;
    //       }
    //     }
    //   }
    // });
    return (
      <div className="line-chart">
        <Line
          data={this.state.lineChartData}
          options={{
            legend: {
              position: "bottom",
              labels: { boxWidth: 10 }
            },
            responsive: true,
            animation: false,
            scales: {
              xAxes: [
                {
                  gridLines: {
                    offsetGridLines: true,
                    display: false
                  },
                  ticks: {
                    labelOffset: 10
                  }
                }
              ],
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    stepSize: 20,
                    min: 0,
                    max: 200,
                    padding: 20,
                    fontSize: 13
                  },
                  gridLines: {
                    drawBorder: false
                  }
                }
              ]
            }
          }}
        />
      </div>
    );
  }
}
