import React from "react";

class LatiLognDetails extends React.Component{

constructor(props){
  super(props);
  this.state = {"CarDetails" : {}}
}


render(){
  this.state.CarDetails = this.props.latlng
    return (
      <div className="lat-logn-details">
        <h2>Lat-Long Details</h2>
        <div className="d-flex align-items-center">
          <label>Latitude</label>
          <label>{this.state.CarDetails.lat}</label>
          <span className="column">Date </span>
          <span>20 Oct 2018</span>
  </div>
        <div className="d-flex align-items-center">
          <label>Longitude</label>
          <label>{this.state.CarDetails.lng}</label>
          <span className="column">Timeframe </span>
          <span>10:00-10:30 AM</span>
        </div>
  
        <div className="d-flex align-items-center">
          <label>Video Position</label>
          <label></label>
          <span className="column">Video Length </span>
          <span>00:30:00</span>
        </div>
        <div className="d-flex align-items-center">
          <label>Accident DateTime</label>
          <label>{this.props.accidentData ? this.props.accidentData.dateTime : ""}</label>
          <span className="column">Accident Position</span>
          <span>{this.props.accidentData ? this.props.accidentData.latitude+" "+ this.props.accidentData.longitude  : ""}</span>
        </div>
      </div>
    );
}
}

// const LatiLognDetails = (props) => {
//   console.log("props",props.latlng);
 
// };

export default LatiLognDetails;
