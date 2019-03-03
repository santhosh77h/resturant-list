import React from "react";
import { top15 } from "../../utils/resturants";
import "./index.css";

export default class Header extends React.Component {
  state = { top15: top15() };
  render() {
    console.log(this.state.top15);
    const { top15 } = this.state;
    return (
      <section className="Top-Resturants">
        <div className={"head"}>Top Restuarant</div>

        <div style={{ position: "relative" }}>
          <div className={"container"}>
            {top15.map((el, index) => (
              <div className={"each-top-restuarant"} key={index}>
                <img
                  src={"https://source.unsplash.com/random"}
                  className={"resturant-image"}
                />
                <div className={"resturant-name"}>{el.Name}</div>
                <div className={"rating"}>
                  <div>
                    &#9733;&nbsp;{el.Rating}
                    <span className={"number-of-reviews"}>
                      ({el["Number of Reviews"]})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={"indicator"}>&#x2192;</div>
        </div>
        <div />
      </section>
    );
  }
}
