import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header";
import TopRestuarant from "./components/topresturants";
import ResturantList from "./components/restuarantList"
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className={"App-content"}>
          <TopRestuarant />
          <ResturantList />
        </div>
      </div>
    );
  }
}

export default App;
