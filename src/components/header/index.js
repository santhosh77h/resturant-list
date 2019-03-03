import React from "react";

import "./index.css";

export default class Header extends React.Component {
  render() {
    return (
      <header className="App-header">
        <div className={"container"}>
          <div>Restuarants</div>
          <div>Search&nbsp; &#9832;</div>
        </div>
      </header>
    );
  }
}
