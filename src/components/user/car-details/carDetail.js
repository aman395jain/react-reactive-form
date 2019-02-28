import React, { Component } from "react";
import "./carDetail.scss";
import axios from "axios";
import _ from "lodash";
import Modal from "../forms/modalForm";
import videojs from "video.js";

import LatiLognDetails from "../lati-long-details/latiLongDetails";
import MapDetails from "../map-details/mapDetails";
// import CarVideo from "../car-video/CarVideo";
import DonutChart from "./../charts/donut-chart/donut_Chart";
import BarChart from "./../charts/barChart-chart2/barChart";
import LineChart from "./../charts/line-chart/lineChart";
import GoogleMapComponent from "./../Google-Map/googleMapRoute";

class CarDetail extends Component {
  state = {
    url:
      "https://www.totaleclips.com/Player/Bounce.aspx?eclipid=e108119&bitrateid=449&vendorid=102&type=.mp4",
    responseFlag: false
  };

  constructor(props) {
    super(props);

    this.state = {
      latlng: {},
      cardata: {},
      accidentData: {}
      //videoUrl:"https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8",
    };
    const id = props.match.params.vin;
    //this.updateVideo("carvin121212_cam1");
    this.setLatLng = this.setLatLng.bind(this);
    this.setRoutes = this.setRoutes.bind(this);
    this.updateVideo = this.updateVideo.bind(this);
    this.isMapActive = 1;
  }
  componentDidMount() {
    //console.log(componentDidMount)

    axios
      .post(
        "https://skloa3avwj.execute-api.us-east-1.amazonaws.com/prototype",
        {
          vin: this.props.match.params.vin
        }
      )
      .then(response => {
        console.log("data", typeof response.data.message);
        if (
          response &&
          response.data &&
          typeof response.data.message === "undefined"
        ) {
          console.log("hare in data");
          this.setState({ responseFlag: true });
          this.setState({ cardata: response.data });
          this.setState({ accidentData: response.data.accidentFlagData[0] });
          //this.setState({ camdata : response.data.cardata })
          this.updateVideo("carvin121212_cam1");
        } else {
          console.log("hare in not data");
          this.refs.modalform.onOpenModal(this.props.match.params.vin);
        }
      })
      .catch(err => {
        console.log("err" + err);
      });
  }

  setLatLng(e) {
    //console.log("setlatlng" ,e);
    this.setState({
      latlng: { lat: e.lat().toFixed(6), lng: e.lng().toFixed(6) }
    });
    //console.log(this.state.latlng);
  }

  updateVideo(camName) {
    if (this.state.cardata) {
      console.log(
        "this.state.cardata.streamData",
        this.state.cardata.streamData
      );
      // let videodetails = [];
      let videodetails = _.filter(
        this.state.cardata.streamData,
        item => item.name == camName
      ).map(item => {
        return { url: item.url };
      });

      if (videodetails[0].url) {
        this.player = videojs("car-video");
        this.player.src({
          src: videodetails.length > 0 ? videodetails[0].url : "",
          type: "application/x-mpegURL"
        });
      } else {
        this.player = videojs("car-video");
        this.player.src({
          src:
            "https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8",
          type: "application/x-mpegURL"
        });
      }
      console.log("this.videoJsOptions", videodetails);
    }
  }
  setRoutes() {
    // this.refs.googleMap.setRoutes();
    if (this.player.userActive_ && this.isMapActive == 1) {
      // Play the video
      this.player.play();
      this.refs.googleMap.setRoutes();
      this.isMapActive = 2;
    } else if (this.isMapActive == 2) {
      this.player.pause();
      this.refs.googleMap.stopMovement();
      this.isMapActive = 3;
    } else {
      // Pause the video
      this.player.play();
      this.refs.googleMap.startMovement();
      this.isMapActive = 2;

      // Update the button text to 'Play'
      //  playPause.classList.toggle('pause');
    }
    console.log("this.isPlayed", this.isPlayed);
  }

  renderSensor(streamData) {
    if (streamData) {
      console.log("streamData", streamData);
      return streamData.map((data, i) => {
        i++;
        const classN = `sensor pos-${i}`;
        return (
          <span
            key={i}
            className={classN}
            onClick={() => this.updateVideo(data.name)}
          />
        );
      });
    }
  }

  render() {
    return this.state.responseFlag ? (
      <div className="car-details">
        <div className="container">
          <div className="row ">
            <div className="col-12 d-flex">
              <div className="car-image">
                {this.renderSensor(this.state.cardata.streamData)}
              </div>
              <div className="car-video">
                <div className="car-id">{this.props.match.params.vin}</div>
                {/* <CarVideo videoOptions={this.state.videoJsOptions} /> */}
                <div className="video-container">
                  <video
                    id="car-video"
                    className="video-js vjs-default-skin"
                    controls
                    preload="auto"
                    style={{ width: 100 + "%" }}
                    data-setup="{}"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className="row"
            style={{ marginTop: "34px", minHeight: "100px" }}
          >
            <div className="col-12 d-flex p-0">
              <button onClick={this.setRoutes}>click me....</button>
              {/* <button onClick={this.refs.googleMap.stopMovement}>stop....</button>
            <button onClick={this.refs.googleMap.startMovement}>start....</button> */}
            </div>
          </div>
          <div className="row" style={{ marginTop: "34px", width: "1149px" }}>
            <div className="col-12 d-flex p-0">
              <LatiLognDetails
                latlng={this.state.latlng}
                accidentData={this.state.accidentData}
              />
              <GoogleMapComponent
                ref="googleMap"
                setLatLng={this.setLatLng}
                Cardetails={this.state.cardata}
              />
            </div>
          </div>
          <div className="row charts" style={{ marginTop: "18px" }}>
            <div className="col-2 donutChart">
              <DonutChart />
            </div>
            <div className="col-2 barChart">
              <BarChart />
            </div>
            <div className="col-5 lineChart">
              <LineChart />
            </div>
            <div className="col-3" />
          </div>
        </div>
      </div>
    ) : (
      <Modal ref="modalform" />
    );
  }
}

export default CarDetail;
