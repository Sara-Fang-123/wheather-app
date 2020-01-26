import React from "react";
import cloudy from "../svg/cloudy.svg";
import sunny from "../svg/sunny.svg";
import rainy from "../svg/rainy.svg";
import snowy from "../svg/snowy.svg";
import Moment from "moment";
import { colors } from "../UtilLayer/BackgroundColors";

export default function DailyWeather(props) {
  const dayTemp = Math.round(props.weather.dayWeather.temp.day * 1.8 + 32);
  const lowTemp = Math.round(props.weather.dayWeather.temp.min * 1.8 + 32);
  const highTemp = Math.round(props.weather.dayWeather.temp.max * 1.8 + 32);
  const curDate = Moment(props.weather.dayWeather.dt * 1000).calendar(null, {
    sameDay: "[Today]",
    nextDay: "ddd",
    nextWeek: "ddd"
  });
  let curIcon = sunny;

  if (props.weather.dayWeather.weather[0]) {
    switch (props.weather.dayWeather.weather[0].main) {
      case "Rain":
        curIcon = rainy;
        break;
      case "Snow":
        curIcon = snowy;
        break;
      case "Clouds":
        curIcon = cloudy;
        break;
      default:
        curIcon = sunny;
        break;
    }
  }

  return (
    <div
      className="daily-weather"
      style={{ background: colors[Math.floor(Math.random() * colors.length)] }}
    >
      <img src={curIcon} />
      <span>{dayTemp + "°F"}</span>
      <p>{curDate}</p>
      <p>{`${lowTemp}~${highTemp}` + "°F"}</p>
    </div>
  );
}
