import React from "react";
import "../styles/Header.css";

export default function Header(props) {
  return (
    <div>
      <span>{props.city + ", " + props.country}</span>
    </div>
  );
}
