import React from "react";
import axios from "axios";
import _ from "lodash";
import logo from "./../../../assets/images/icons8-sedan-26.png";

export default class GoogleMapComponent extends React.Component {
  constructor(props) {
    super(props);

    //this.setState({routeArray : cardata});
    this.state = {
      mapIsReady: false,
      routeArray: []
      //[
      //   { location: "Noida Sec 62,UP", stopover: true },
      //   { location: "Noida Sec 37,UP", stopover: false },
      //   { location: "Noida Sec 126,UP", stopover: false },
      //   { location: "Noida Sec 135,UP", stopover: false },
      //   { location: "Pari chowk,UP", stopover: true },
      // ]
    };

    this.setRoutes = this.setRoutes.bind(this);
    this.makeRouteCallback = this.makeRouteCallback.bind(this);
    this.createMarker = this.createMarker.bind(this);
    this.startAnimation = this.startAnimation.bind(this);
    this.updatePoly = this.updatePoly.bind(this);
    this.animate = this.animate.bind(this);
    this.startmap = this.startmap.bind(this);
    this.stopMovement = this.stopMovement.bind(this);
    this.startMovement = this.startMovement.bind(this);
    this.computeTotalDistance = this.computeTotalDistance.bind(this);

    this.map = null;
    this.directionsService = null;
    this.marker = [];
    this.polyLine = [];
    this.poly2 = [];
    this.startLocation = [];
    this.endLocation = [];
    this.timerHandle = [];
    this.infoWindow = null;
    this.index = 0;
    this.startLoc = [];
    this.endLoc = [];

    this.lastVertex = 1;
    this.step = 50; // 5; // metres
    this.eol = [];
    this.car =
      "M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z";
    this.icon = {
      path: this.car,
      scale: 0.7,
      strokeColor: "white",
      strokeWeight: 0.1,
      fillOpacity: 1,
      fillColor: "#404040",
      offset: "5%",
      // rotation: parseInt(heading[i]),
      anchor: new window.google.maps.Point(10, 25) // orig 10,50 back of car, 10,0 front of car, 10,25 center of car
    };
  }

  componentWillMount() {
    // axios.get("").then(response => {
    //   this.state.routeArray = response.data;
    // })
    // const ApiKey = 'AIzaSyAQoP1pA_88qyn368YD5N2i1tuA6eWhqX0';
    // const script = document.createElement('script');
    // script.src = `https://maps.window.googleapis.com/maps/api/js?key=${ApiKey}`;
    // script.async = true;
    // script.defer = true;
    // script.addEventListener('load', () => {
    //   this.setState({ mapIsReady: true });
    // });
    // console.log("this.map", this.map);
    // // document.body.appendChild(script);
    // const map = new window.google.maps.Map(document.getElementById('map'), {
    //   zoom: 4
    // });
    // let address = 'New Delhi'
    // // Geocoder is used to encode or actually geocode textual addresses to lat long values
    // let geocoder = new window.google.maps.Geocoder();
    // geocoder.geocode({ 'address': address }, function (results, status) {
    //   map.fitBounds(results[0].geometry.viewport);
    // });
    // this.map = map;
    // this.setRoutes(map);
  }

  startmap() {
    return new Promise((resolve, reject) => {
      //console.log("this.map", this.map);
      // document.body.appendChild(script);
      console.log("props for google component", this.props);
      // let cardata =
      // [
      //     {
      //       "vin": "121212",
      //       "dateTime": "2019-02-05T17:22:32Z",
      //       "latitude": "37.388467",
      //       "longitude": "-122.008963"
      //     },
      //     {
      //       "vin": "121212",
      //       "dateTime": "2019-02-05T17:23:32Z",
      //       "latitude": "37.388249",
      //       "longitude": "-122.008637"
      //     },
      //     {
      //       "vin": "121212",
      //       "dateTime": "2019-02-05T17:24:32Z",
      //       "latitude": "37.388267",
      //       "longitude": "-122.008251"
      //     },
      //     {
      //       "vin": "121212",
      //       "dateTime": "2019-02-05T17:25:32Z",
      //       "latitude": "37.388335",
      //       "longitude": "-122.007779"
      //     },
      //     {
      //       "vin": "121212",
      //       "dateTime": "2019-02-05T17:26:32Z",
      //       "latitude": "37.388215",
      //       "longitude": "-122.007435"
      //     },
      //     {
      //       "vin": "121212",
      //       "dateTime": "2019-02-05T17:27:32Z",
      //       "latitude": "37.388266",
      //       "longitude": "-122.006985"
      //     },
      //     {
      //       "vin": "121212",
      //       "dateTime": "2019-02-05T17:28:32Z",
      //       "latitude": "37.388318",
      //       "longitude": "-122.006513"
      //     },
      //     {
      //       "vin": "121212",
      //       "dateTime": "2019-02-05T17:29:32Z",
      //       "latitude": "37.388266",
      //       "longitude": "-122.005933"
      //     },
      //     {
      //       "vin": "121212",
      //       "dateTime": "2019-02-05T17:30:32Z",
      //       "latitude": "37.388283",
      //       "longitude": "-122.005418"
      //     },
      //     {
      //       "vin": "121212",
      //       "dateTime": "2019-02-05T17:31:32Z",
      //       "latitude": "37.388437",
      //       "longitude": "-122.004817"
      //     },
      //     {
      //       "vin": "121212",
      //       "dateTime": "2019-02-05T17:32:32Z",
      //       "latitude": "37.388590",
      //       "longitude": "-122.004774"
      //     },
      //     {
      //       "vin": "121212",
      //       "dateTime": "2019-02-05T17:33:32Z",
      //       "latitude": "37.388812",
      //       "longitude": "-122.004774"
      //     },
      //     {
      //       "vin": "121212",
      //       "dateTime": "2019-02-05T17:34:32Z",
      //       "latitude": "37.389102",
      //       "longitude": "-122.004796"
      //     },
      //     {
      //       "vin": "121212",
      //       "dateTime": "2019-02-05T17:35:32Z",
      //       "latitude": "37.389374",
      //       "longitude": "-122.004409"
      //     },
      //     {
      //       "vin": "121212",
      //       "dateTime": "2019-02-05T17:36:32Z",
      //       "latitude": "37.389374",
      //       "longitude": "-122.004409"
      //     },
      //     {
      //       "vin": "121212",
      //       "dateTime": "2019-02-05T17:37:32Z",
      //       "latitude": "37.389405",
      //       "longitude": "-122.004295"
      //     }
      //   ]

      // {
      //   "vin": "121212",
      //   "dateTime": "2019-02-05T17:24:32Z",
      //   "latitude": "37.383486",
      //   "longitude": "-122.013513"
      // },
      // {
      //   "vin": "121212",
      //   "dateTime": "2019-02-05T17:22:32Z",
      //   "latitude": "37.383576",
      //   "longitude": "-122.013755"
      // },
      // {
      //   "vin": "121212",
      //   "dateTime": "2019-02-05T17:26:32Z",
      //   "latitude": "37.383363",
      //   "longitude": "-122.013304"
      // },
      // {
      //   "vin": "121212",
      //   "dateTime": "2019-02-05T17:27:32Z",
      //   "latitude": "37.383273",
      //   "longitude": "-122.013186"
      // },
      // {
      //   "vin": "121212",
      //   "dateTime": "2019-02-05T17:28:32Z",
      //   "latitude": "37.383180",
      //   "longitude": "-122.013052"
      // },
      // {
      //   "vin": "121212",
      //   "dateTime": "2019-02-05T17:29:32Z",
      //   "latitude": "37.383116",
      //   "longitude": "-122.012966"
      // },
      // {
      //   "vin": "121212",
      //   "dateTime": "2019-02-05T17:30:32Z",
      //   "latitude": "37.383064",
      //   "longitude": "-122.012875"
      // },
      // {
      //   "vin": "121212",
      //   "dateTime": "2019-02-05T17:31:32Z",
      //   "latitude": "37.383030",
      //   "longitude": "-122.012719"
      // },
      // {
      //   "vin": "121212",
      //   "dateTime": "2019-02-05T17:32:32Z",
      //   "latitude": "37.383150",
      //   "longitude": "-122.012574"
      // },
      // {
      //   "vin": "121212",
      //   "dateTime": "2019-02-05T17:33:32Z",
      //   "latitude": "37.383256",
      //   "longitude": "-122.012515"
      // },
      // {
      //   "vin": "121212",
      //   "dateTime": "2019-02-05T17:34:32Z",
      //   "latitude": "37.383393",
      //   "longitude": "-122.012397"
      // },
      // {
      //   "vin": "121212",
      //   "dateTime": "2019-02-05T17:35:32Z",
      //   "latitude": "37.383512",
      //   "longitude": "-122.012322"
      // },
      // {
      //   "vin": "121212",
      //   "dateTime": "2019-02-05T17:36:32Z",
      //   "latitude": "37.383648",
      //   "longitude": "-122.012151"
      // },
      // {
      //   "vin": "121212",
      //   "dateTime": "2019-02-05T17:37:32Z",
      //   "latitude": "37.383789",
      //   "longitude": "-122.011952"
      // }
      // ];

      //  cardata = cardata.map(item => { return {
      //   location : new window.google.maps.LatLng(item.latitude,item.longitude),
      //   stopover : false
      // }})

      let cardata =
        this.props.Cardetails && this.props.Cardetails.gpsData
          ? this.props.Cardetails.gpsData.map(item => {
              return {
                location: new window.google.maps.LatLng(
                  item.latitude,
                  item.longitude
                ),
                stopover: false
              };
            })
          : [];

      this.setState({ routeArray: cardata });
      console.log("cardata", cardata);
      const map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 10
      });

      // let address = 'New Delhi'

      // // Geocoder is used to encode or actually geocode textual addresses to lat long values
      // let geocoder = new window.google.maps.Geocoder();
      // geocoder.geocode({ 'address': address }, function (results, status) {
      //   map.fitBounds(results[0].geometry.viewport);
      // });
      if (map) {
        resolve(map);
      }
      reject("Map not initialized");
    });

    // this.map = map;
    // return map;
    //this.setRoutes(map);
  }

  // Using Directions Service find the route between the starting and ending points
  setRoutes() {
    let self = this;
    this.startmap()
      .then(map => {
        var startVal = this.state.routeArray[0].location; //document.getElementById("start").value
        var endVal = this.state.routeArray[this.state.routeArray.length - 1]
          .location; //document.getElementById("end").value;
        if (!startVal || !endVal) {
          console.log("start and end locations missing");
          return;
        }
        // just to avoid weird case of same start and end location
        if (startVal === endVal) {
          console.log("Please enter different locations in both inputs");
          return;
        }
        let startLoc = [];
        let endLoc = [];
        startLoc[0] = startVal;
        endLoc[0] = endVal;
        //empty out previous values
        self.startLocation = [];
        self.endLocation = [];
        self.polyLine = [];
        self.poly2 = [];
        self.timerHandle = [];

        var directionsDisplay = new Array();
        for (var i = 0; i < startLoc.length; i++) {
          var rendererOptions = {
            map: map,
            suppressMarkers: true,
            preserveViewport: true
          };
          let directionsService = new window.google.maps.DirectionsService();
          //var directionsrenderer = new window.google.maps.DirectionsRenderer({ map: map });
          var travelMode = window.google.maps.DirectionsTravelMode.DRIVING;
          var request = {
            origin: startLoc[i], //new window.google.maps.LatLng(,-122.419418),//
            destination: endLoc[i], //new window.google.maps.LatLng(37.804363,-122.271111),//
            waypoints: this.state.routeArray.slice(
              1,
              this.state.routeArray.length - 1
            ),
            //optimizeWaypoints: true,
            travelMode: travelMode
          };
          console.log("request", request);
          directionsService.route(
            request,
            //   function (response, status) {
            //   // Route the directions and pass the response to a function to create
            //   // markers for each step.
            //   if (status === 'OK') {
            //     // document.getElementById('warnings-panel').innerHTML =
            //     //     '<b>' + response.routes[0].warnings + '</b>';
            //     //directionsrenderer.setDirections(response);
            //     console.log("legsssss",response.routes);
            //     //showSteps(response, markerArray, stepDisplay, map);
            //   } else {
            //     window.alert('Directions request failed due to ' + status);
            //   }
            // });
            self.makeRouteCallback(map, i, directionsDisplay[i]),
            rendererOptions
          );
        }
      })
      .catch(err => {
        console.log("ERROR :" + err);
      });
  }

  computeTotalDistance(result) {
    let totalDist = 0;
    //var totalTime = 0;
    let myroute = result.routes[0];
    for (let i = 0; i < myroute.legs.length; i++) {
      totalDist += myroute.legs[i].distance.value;
      //totalTime += myroute.legs[i].duration.value;
    }
    totalDist = totalDist / 1000;
    console.log("total disctnce", totalDist);
    //document.getElementById("total").innerHTML = "total distance is: " + totalDist + " km<br>total time is: " + (totalTime / 60).toFixed(2) + " minutes";
  }

  //called after getting route from directions service, does all the heavylifting
  makeRouteCallback(map, routeNum, disp, rendererOptions) {
    let self = this;
    // check if polyline and map exists, if yes, no need to do anything else, just start the animation
    if (this.polyLine[routeNum] && this.polyLine[routeNum].getMap() != null) {
      console.log("polyline and map exists,just start the animation.....");
      self.startAnimation(routeNum);
      return;
    }
    return function(response, status) {
      // if directions service successfully returns and no polylines exist already, then do the following
      if (status == window.google.maps.DirectionsStatus.ZERO_RESULTS) {
        console.log("No routes available for selected locations");
        return;
      }
      if (status == window.google.maps.DirectionsStatus.OK) {
        console.log("this inside", this);
        //console.log("this.startLocation",typeof this.startLocation);
        console.log(
          "directions service successfully returns and no polylines exist already"
        );
        self.startLocation[routeNum] = new Object();
        self.endLocation[routeNum] = new Object();
        // set up polyline for current route
        self.polyLine[routeNum] = new window.google.maps.Polyline({
          path: [],
          strokeColor: "#FFFF00",
          strokeWeight: 3
        });
        self.poly2[routeNum] = new window.google.maps.Polyline({
          path: [],
          strokeColor: "#FFFF00",
          strokeWeight: 3
        });
        // For each route, display summary information.
        console.log("response.routes[0].legs", response.routes[0].legs);
        var legs = response.routes[0].legs;
        // directionsrenderer renders the directions obtained previously by the directions service
        disp = new window.google.maps.DirectionsRenderer(rendererOptions);
        disp.setMap(map);
        disp.setDirections(response);
        self.computeTotalDistance(response);
        let distances = _.flatMap(response.routes, route =>
          _.flatMap(route.legs, leg => leg.distance.value)
        );

        console.log("Total distance", _.sum(distances));
        // create Markers
        for (let i = 0; i < legs.length; i++) {
          // for first marker only
          if (i == 0) {
            self.startLocation[routeNum].latlng = legs[i].start_location;
            self.startLocation[routeNum].address = legs[i].start_address;
            self.marker[routeNum] = self.createMarker(
              map,
              legs[i].start_location,
              "start",
              legs[i].start_address,
              "green"
            );
          }
          self.endLocation[routeNum].latlng = legs[i].end_location;
          self.endLocation[routeNum].address = legs[i].end_address;
          var steps = legs[i].steps;
          for (let j = 0; j < steps.length; j++) {
            let nextSegment = steps[j].path;
            for (let k = 0; k < nextSegment.length; k++) {
              self.polyLine[routeNum].getPath().push(nextSegment[k]);
            }
          }
        }
      }
      if (self.polyLine[routeNum]) {
        // render the line to map
        console.log("animaton inline.....");
        self.polyLine[routeNum].setMap(map);
        console.log("routeNum", routeNum);
        // and start animation
        setTimeout(() => {
          self.startAnimation(map, routeNum);
        }, 2000);
      }
    };
  }

  // returns the marker
  createMarker(map, latlng, label, html) {
    var contentString = "<b>" + label + "</b><br>" + html;
    // using Marker api, marker is created
    var marker = new window.google.maps.Marker({
      position: latlng,
      map: map,
      title: label,
      zIndex: 10
    });
    marker.myname = label;
    // adding click listener to open up info window when marker is clicked
    window.google.maps.event.addListener(marker, "click", function() {
      // this.infoWindow.setContent(contentString);
      // this.infoWindow.open(map, marker);
    });
    return marker;
  }

  // Spawn a new polyLine every 20 vertices
  updatePoly(i, d) {
    if (this.poly2[i].getPath().getLength() > 20) {
      this.poly2[i] = new window.google.maps.Polyline([
        this.polyLine[i].getPath().getAt(this.lastVertex - 1)
      ]);
    }

    if (this.polyLine[i].GetIndexAtDistance(d) < this.lastVertex + 2) {
      if (this.poly2[i].getPath().getLength() > 1) {
        this.poly2[i]
          .getPath()
          .removeAt(this.poly2[i].getPath().getLength() - 1);
      }
      this.poly2[i]
        .getPath()
        .insertAt(
          this.poly2[i].getPath().getLength(),
          this.polyLine[i].GetPointAtDistance(d)
        );
    } else {
      this.poly2[i]
        .getPath()
        .insertAt(
          this.poly2[i].getPath().getLength(),
          this.endLocation[i].latlng
        );
    }
  }

  // updates marker position to make the animation and update the polyline
  animate(index, d, tick) {
    //console.log("index, d, tick",index, d, tick);

    if (d > this.eol[index]) {
      this.marker[index].setPosition(this.endLocation[index].latlng);
      return;
    }
    this.d = d;
    console.log("d", d);
    var p = this.polyLine[index].GetPointAtDistance(d);
    //console.log('p',p.lat(),p.lng());

    var lastPosn = this.marker[index].getPosition();
    this.marker[index].setPosition(p);
    let heading = window.google.maps.geometry.spherical.computeHeading(
      lastPosn,
      p
    );

    let distance = window.google.maps.geometry.spherical.computeDistanceBetween(
      lastPosn,
      p
    );
    console.log("computeDistanceBetween", distance);
    this.icon.rotation = heading;
    this.marker[index].setIcon(this.icon);
    //console.log("currentPosition",currentPosition);
    //console.log("this.marker[index]",this.marker[index]);
    this.updatePoly(index, d);
    this.props.setLatLng(p);
    //console.log("this.poly2",this.poly2);
    let self = this;
    this.timerHandle[index] = setTimeout(() => {
      self.animate(index, d + 20);
    }, tick || 100);
  }

  // start marker movement by updating marker position every 100 milliseconds i.e. tick value
  startAnimation(map, index) {
    console.log("start Animation", index);
    if (this.timerHandle[index])
      //this.marker.setIcon("../../assets/images/icons8-sedan-26.png");
      clearTimeout(this.timerHandle[index]);
    this.eol[index] = this.polyLine[index].Distance();
    console.log("this.eol[index]", this.eol[index]);
    //map.setCenter(this.polyLine[index].getPath().getAt(0));

    this.poly2[index] = new window.google.maps.Polyline({
      path: [this.polyLine[index].getPath().getAt(0)],
      strokeColor: "#FFFF00",
      strokeWeight: 3
    });
    let self = this;

    this.timerHandle[index] = setTimeout(() => {
      self.animate(index, 50);
    }, 2000); // Allow time for the initial map display
    this.index = index;
  }

  stopMovement() {
    console.log("this.timerHandle", this.timerHandle[this.index]);
    clearTimeout(this.timerHandle[this.index]);
  }

  startMovement() {
    console.log("this.d", this.d);
    this.timerHandle[this.index] = setTimeout(() => {
      this.animate(this.index, this.d);
    }, 2000);
  }

  calculateTimetotravel() {
    this.state.timeToTravel = 10;
  }

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div id="map" style={{ width: "100%", height: "100%" }} />
      </div>
    );
  }
}
