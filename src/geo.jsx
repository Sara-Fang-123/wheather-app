import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import GeocodeService from "../src/geocode_service";

class App extends React.Component {
  state = {
    street: "",
    city: "",
    state: "",
    zip: "",
    lat: 0,
    lng: 0
  };

  isAddressValid = () => {
    const { street, city, state, zip } = this.state;
    return street && city && state && zip && zip.length >= 5;
    // this.state.foreach((s) => {
    //   if(s.length === 0){
    //     return false;
    //   };
    // });
    // return true;
  };

  handleChangeAddress = e => {
    //arrow function opt
    this.setState({ [e.target.name]: e.target.value }, () => {
      if (this.isAddressValid()) {
        GeocodeService.geocode(this.state)
          .then(res => {
            this.setState({ lat: res.lat, lng: res.long });
          })
          .catch(e => console.log(e));
      }
    });
  };

  get lat() {
    return Number.parseFloat(this.state.lat || 0).toPrecision(5);
  }

  get lng() {
    return Number.parseFloat(this.state.lng || 0).toPrecision(5);
  }

  render() {
    return (
      <div className="App">
        <h1>Address Geocoder</h1>
        <div className="field-group">
          <label>Street</label>
          <input
            name="street"
            value={this.state.street}
            onChange={this.handleChangeAddress}
          />
        </div>
        <div className="field-group">
          <label>City</label>
          <input
            name="city"
            value={this.state.city}
            onChange={this.handleChangeAddress}
          />
        </div>
        <div className="field-group">
          <label>State</label>
          <input
            name="state"
            value={this.state.state}
            onChange={this.handleChangeAddress}
          />
        </div>
        <div className="field-group">
          <label>Zip code</label>
          <input
            name="zip"
            value={this.state.zip}
            onChange={this.handleChangeAddress}
          />
        </div>

        <div>
          <h4>Geocoding results:</h4>({this.lat}, {this.lng})
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
