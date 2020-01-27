import App from "../";
import * as getWeatherInfo from "../../UtilLayer/GetWeatherInfo";
import { colors } from "../../UtilLayer/BackgroundColors";
import { shallow } from "enzyme";

describe("App", () => {
  let appComponent;
  let weathers;
  let getWeatherMock;
  const renderApp = () => {
    return shallow(<App />);
  };

  beforeEach(() => {
    appComponent = renderApp();
    weathers = appComponent.find(".container");
    getWeatherMock = jest.spyOn(getWeatherInfo, "getWeatherInfo");
  });

  it("renders correctly", () => {
    expect(appComponent.find(input).length).toEqual(1);
    expect(weathers.children.length()).toEqual(9);
    expect(appComponent.find("header").children.length()).toEqual(1);
  });

  it("calls onClick correctly", () => {
    appComponent.props().onClick();
    expect(getWeatherMock).toBeCalledTimes(1);
  });

  it("pass props to DailyWeather correctly", () => {
    weathers.children.forEach((dayWeather, index) => {
      expect(dayWeather.props().weather).toMatchObject(
        appComponent.state().weather[index]
      );
      expect(dayWeather.props().itemColor).toEqual(
        (this.state.colorIdx % colors.length) + 1
      );
    });
  });
});
