const KEY = "d94bcd435b62a031771c35633f9f310a";
const URL = "http://api.openweathermap.org/data/2.5/";

let getWeatherInfo = async city => {
  let weatherUrl = `${URL}/forecast/daily?q=${city}&units=metric&cnt=9&appid=${KEY}`;
  const response = await fetch(weatherUrl);
  return await response.json();
};

export default getWeatherInfo;
