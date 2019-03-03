import React from "react";
import { getCuisine } from "../../utils/resturants";
import _ from "underscore";

let cuisinesList = getCuisine();

let list = Object.keys(cuisinesList).map(key => {
  return { item: key, count: cuisinesList[key], selected: false };
});

list = _.sortBy(list, el => -el.count);

export default class Cuisine extends React.Component {
  state = {
    cuisine: list,
    selected: [],
    cuisineSelected: ""
  };

  selectCuisine = item => {
    // let { cuisine } = this.state;
    // const found = cuisine.findIndex(el => el.item == item);

    // if (found > -1) {
    //   cuisine[found].selected = !cuisine[found].selected;
    //   this.setState({ cuisine });

    // }

    this.setState({ cuisineSelected: item });
    this.props.selectedCuisines(item);
  };

  render() {
    const { cuisine, cuisineSelected } = this.state;

    return (
      <div className={"container"}>
        <h2>Select Cusinie</h2>
        <div className={"cuisineList"}>
          {cuisine.map((el, index) => {
            return (
              <div
                className={
                  el.item == cuisineSelected
                    ? "each-cusine selected"
                    : "each-cusine"
                }
                onClick={() => this.selectCuisine(el.item)}
              >
                <div>
                  <div className={"cusine-name"}>{el.item}</div>
                  <div className={"cuisine-count"}>{el.count} Restuarants</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
