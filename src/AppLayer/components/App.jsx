import React, { Component } from "react";
import getWeatherInfo from "../../UtilLayer/GetWeatherInfo";
import { colors } from "../../UtilLayer/BackgroundColors";
import Header from "./Header";
import DailyWeather from "./DailyWeather";
import { ErrorBoundary } from "./ErrorBoundary";
import "../styles/App.css";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: [],
      inputCity: "",
      colorIdx: Math.floor(Math.random() * colors.length)
    };
  }
  componentDidMount() {
    this.getcall();
  }
  getcall = () => {
    getWeatherInfo(this.state.inputCity || "philadelphia").then(response => {
      let weather = response.list
        ? response.list.map(item => {
            return {
              dayWeather: item,
              country: response.city.country,
              city: response.city.name
            };
          })
        : [];

      if (!response.city) {
        alert(
          `${this.state.inputCity} is not valid name, please enter a correct name`
        );
      }

      this.setState(() => ({
        weather: weather,
        inputCity: "",
        colorIdx: Math.floor(Math.random() * colors.length)
      }));
    });
  };

  handleInputChange = e => {
    this.setState({ inputCity: e.target.value });
  };

  render() {
    return (
      <div style={{ backgroundColor: colors[this.state.colorIdx] }}>
        <input
          aria-label="Input City"
          value={this.state.inputCity}
          onChange={this.handleInputChange}
        />
        <button aria-label="Search" onClick={this.getcall}>
          search
        </button>
        <ErrorBoundary>
          <Header
            city={
              this.state.weather[0]
                ? this.state.weather[0].city
                : "philadelphia"
            }
            country={
              this.state.weather[0] ? this.state.weather[0].country : "US"
            }
          />
        </ErrorBoundary>
        <div className="container">
          {this.state.weather &&
            this.state.weather.map((item, index) => (
              <DailyWeather
                key={index}
                weather={item}
                itemColor={(this.state.colorIdx % colors.length) + 1}
              />
            ))}
        </div>
      </div>
    );
  }
}
