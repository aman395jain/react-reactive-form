import React from "react";
import { Doughnut, Chart } from "react-chartjs-2";
import "../_chart.scss";

export default class DonutWithText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      donutChartData: {}
    };
  }

  getDonutChartData() {
    this.setState({
      donutChartData: {
        labels: ["Safe", "Rash", "Moderate"],
        datasets: [
          {
            data: [22, 6, 10],
            label: "Car 1",
            backgroundColor: [
              "rgb(0, 228, 228)",
              "rgb(255, 00, 00)",
              "rgb(62, 57, 57)"
            ],
            hoverBackgroundColor: [
              "rgb(0, 228, 228)",
              "rgba(255, 00, 00)",
              "rgba(62, 57, 57)"
            ]
          },
          {
            data: [16, 9, 13],
            label: "Car 2",
            backgroundColor: [
              "rgb(0, 228, 228)",
              "rgb(255, 00, 00)",
              "rgb(62, 57, 57)"
            ],
            hoverBackgroundColor: [
              "rgb(0, 228, 228)",
              "rgba(255, 00, 00)",
              "rgba(62, 57, 57)"
            ]
          }
        ],
        text: "38 Total Trips"
      }
    });
  }

  componentDidMount() {
    this.getDonutChartData();
  }
  render() {
    const data = this.state.donutChartData;
    let originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
    Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
      draw: function() {
        originalDoughnutDraw.apply(this, arguments);

        let chart = this.chart;
        let width = chart.chart.width,
          height = chart.chart.height,
          ctx = chart.chart.ctx;

        let fontSize = 1;
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "middle";

        let text = chart.config.data.text,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = 85;

        ctx.fillText(text, textX, textY);
      }
    });
    return (
      <div className="donut-chart">
        <Doughnut
          data={this.state.donutChartData}
          options={{
            legend: {
              display: true,
              position: "bottom",
              labels: {
                boxWidth: 10,
                fontSize: 14
              }
            },
            cutoutPercentage: 70,
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            hover: { intersect: false },
            tooltips: {
              callbacks: {
                label: function(item, data) {
                  return (
                    data.datasets[item.datasetIndex].label +
                    ": " +
                    data.labels[item.index] +
                    ": " +
                    data.datasets[item.datasetIndex].data[item.index]
                  );
                }
              }
            }
          }}
        />
      </div>
    );
  }
}
