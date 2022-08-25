import React from "react";
import logo from "./logo.svg";
import rgbColors from "./assets/colors.js";
import "./App.css";
import background1 from "./assets/background-imgs/background1.png";
import copyIcon from "./assets/background-imgs/copy-icon.png";
function App() {
  // gradient object
  const [gradient, setGradient] = React.useState({
    color1: "rgb(82, 91, 255)",
    color1Percent: "25%",
    color2: "rgb(249, 91, 1)",
    color2Percent: "50%",
    color3: "rgb(243, 55, 28)",
    color3Percent: "75%",
    orientationToBottom: true,
    witchGradientSection: "color1",
    topBtn: "rgb(84, 193, 223)",
    middleBtn: "rgb(255, 255, 255)",
    bottomBtn: "rgb(255, 255, 255)",
  });

  let gradientOutput = "";
  let orientation = "";
  let topLeft = gradient.orientationToBottom ? "top" : "left";
  let bottomRight = gradient.orientationToBottom ? "bottom" : "right";
  let controlBtns = gradient.orientationToBottom
    ? "control-btns-vertical"
    : "control-btns";
  let topMiddleBottomBtns = gradient.orientationToBottom
    ? "top-middle-bottom-btns-vertical"
    : "top-middle-bottom-btns";
  let sliderBtnContainer = gradient.orientationToBottom
    ? "slider-btn-container-vertical"
    : "slider-btn-container";

  orientation = gradient.orientationToBottom ? "bottom" : "right";
  function useGradient() {
    gradientOutput = `linear-gradient(to ${orientation},
    ${gradient.color1} ${gradient.color1Percent},
    ${gradient.color2} ${gradient.color2Percent},
    ${gradient.color3} ${gradient.color3Percent})`;
  }
  // set gradient orientation
  function changeGradientOrientation() {
    setGradient((prevGradient) => ({
      ...prevGradient,
      orientationToBottom: !prevGradient.orientationToBottom,
    }));
  }
  // set what part of gradient to change color

  useGradient();
  // change gradient color
  function changeValue(event) {
    setGradient((prevGradient) => ({
      ...prevGradient,
      [prevGradient.witchGradientSection]: event.target.value,
    }));
  }

  function pickWitchGradientSection(event) {
    setGradient((prevGradient) => ({
      ...prevGradient,
      witchGradientSection: event.target.value,
    }));

    if (event.target.name === "topBtn") {
      setGradient((prevGradient) => ({
        ...prevGradient,
        topBtn: "rgba(84, 193, 223, 1.0)",
        middleBtn: "rgba(255, 255, 255, 1.0)",
        bottomBtn: "rgba(255, 255, 255, 1.0)",
      }));
    } else if (event.target.name === "middleBtn") {
      setGradient((prevGradient) => ({
        ...prevGradient,
        topBtn: "rgba(255, 255, 255, 1.0)",
        middleBtn: "rgba(84, 193, 223, 1.0)",
        bottomBtn: "rgba(255, 255, 255, 1.0)",
      }));
    } else {
      setGradient((prevGradient) => ({
        ...prevGradient,
        topBtn: "rgba(255, 255, 255, 1.0)",
        middleBtn: "rgba(255, 255, 255, 1.0)",
        bottomBtn: "rgba(84, 193, 223, 1.0)",
      }));
    }
  }

  const colorElements = rgbColors.map((color) => (
    <button
      className="color-btn btn"
      key={color.id}
      value={color.rgbColor}
      style={{
        background: `${color.rgbColor}`,
      }}
      onClick={changeValue}
    ></button>
  ));
  function gradientSlider(event) {
    setGradient((prevGradient) => ({
      ...prevGradient,
      [`${prevGradient.witchGradientSection}Percent`]: [
        `${event.target.value}%`,
      ],
    }));
  }

  function copyGradient() {
    navigator.clipboard.writeText(gradientOutput);
  }

  return (
    <div className="App">
      <div
        style={{
          backgroundImage: `url(${background1})`,
        }}
        className="main-content"
      >
        <h1 className="title">
          {" "}
          <span className="title-big-front-size">G</span>radient{" "}
          <span className="title-big-front-size">m</span>ixer
        </h1>
        <div
          className="gradient"
          style={{
            background: `${gradientOutput}`,
          }}
        ></div>
        {/* control buttons */}
        <div className={controlBtns}>
          <button
            className="gradient-switch-btn btn"
            onClick={changeGradientOrientation}
          >
            switch <br /> orientation:
          </button>
          <div className={topMiddleBottomBtns}>
            <button
              className="top-middle-bottom-btn btn"
              onClick={pickWitchGradientSection}
              value={"color1"}
              name={"topBtn"}
              style={{
                background: `${gradient.topBtn}`,
              }}
            >
              {topLeft}
            </button>
            <button
              className="top-middle-bottom-btn btn"
              onClick={pickWitchGradientSection}
              value={"color2"}
              name={"middleBtn"}
              style={{
                background: `${gradient.middleBtn}`,
              }}
            >
              middle
            </button>
            <button
              className="top-middle-bottom-btn btn"
              onClick={pickWitchGradientSection}
              value={"color3"}
              name={"bottomBtn"}
              style={{
                background: `${gradient.bottomBtn}`,
              }}
            >
              {bottomRight}
            </button>
          </div>
          <div className={sliderBtnContainer}>
            <input
              type="range"
              min={10}
              max={60}
              defaultValue={30}
              className="slider-btn"
              onChange={gradientSlider}
            />
          </div>
        </div>
        <div className="color-btns">{colorElements}</div>

        <div className="copy-gradient-container">
          <p className="gradient-css">background: {gradientOutput}</p>
          <div className="copy-button" onClick={copyGradient}>
            <img className="copy-img" src={copyIcon} alt="copy icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
