import React from "react";
import { top30, getCuisine, searchCuisine } from "../../utils/resturants";
import Cuisine from "./cusinie";

import "./index.css";

export default class RestuarantList extends React.Component {
  state = {
    top30: top30(),
    cusinies: getCuisine(),
    cuisineSelected: [],
    page: 1,
    searchquery: "",
    toprated: false
  };

  searchQueryUpdate = searchquery => {
    this.setState({ searchquery }, () => this.searchInServer("search", 1));
  };

  fetchTopRated = () => {
    if (this.state.toprated) {
      this.setState({ toprated: false });
    } else {
      this.searchInServer("toprated", 1);
      this.setState({ toprated: true });
    }
  };

  searchInServer = (filterby, page) => {
    const { cuisineSelected, searchquery, toprated } = this.state;
    searchCuisine(cuisineSelected, page, searchquery, filterby, toprated)
      .then(response => {
        console.log(response);
        if (response.type == "success") {
          this.setState({ page: page, top30: [...response.result] });
        }

        console.log(response);
      })
      .catch(err => console.log(err));
  };

  selectedCuisines = newCuisine => {
    let { cuisineSelected } = this.state;
    this.setState({ cuisineSelected: [newCuisine] }, () =>
      this.searchInServer("cuisine", 1)
    );
  };

  render() {
    const { top30, cusinies, cuisineSelected, toprated } = this.state;
    console.log(top30[0]);
    return (
      <section className={"App-main"}>
        <div className={"App-cuisine"}>
          <Cuisine selectedCuisines={this.selectedCuisines} />
        </div>
        <div className={"resturantList"}>
          <div>
            <div className={"search-modifier"}>
              <div className={"search"}>
                <UpdateInput searchQueryUpdate={this.searchQueryUpdate} />
              </div>
              <div
                onClick={this.fetchTopRated}
                className={toprated ? "active" : ""}
              >
                <div>Top Rated</div>
                <img src={require("../../assets/filter.png")} />
              </div>
            </div>
            <div>
              <SelectedCuisines cuisineSelected={cuisineSelected} />
            </div>
            <div className={"container"}>
              {top30.map((el, indx) => {
                return (
                  <div className={"each-item"}>
                    <div>
                      <img
                        className={"resturant-image"}
                        src={
                          "https://images.unsplash.com/photo-1460380410874-537ecece3984?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=647&q=80"
                        }
                      />
                      <div className={"restuarant-name"}>{el.Name}</div>
                      <div className={"restuarant-review"}>
                        <b>&#9733;&nbsp;{el.Rating}</b>
                        <span>
                          {el["Number of Reviews"] &&
                          el["Number of Reviews"] > 0
                            ? "(" + el["Number of Reviews"] + ")"
                            : null}
                        </span>
                      </div>
                      <div className={"restuarant-cuisine"}>
                        <ShowCusine cusinie={el["Cuisine Style"]} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

class UpdateInput extends React.Component {
  state = {
    searchquery: ""
  };

  findInServer = () => this.props.searchQueryUpdate(this.state.searchquery);

  onChangeText = type => e => {
    if (this.clear) {
      clearTimeout(this.clear);
    }
    this.setState({ [type]: e.target.value });
    this.clear = setTimeout(() => this.findInServer(), 1000);
  };

  render() {
    const { searchquery } = this.state;
    return (
      <input
        onChange={this.onChangeText("searchquery")}
        value={searchquery}
        type={"text"}
        id={"search"}
        placeholder={"search for restuarant"}
      />
    );
  }
}

const SelectedCuisines = props => {
  console.log(props.cuisineSelected, "cuisineSelected");
  return (
    <div className={"cusine-list"} style={{ maxWidth: "75%" }}>
      {props.cuisineSelected.map((el, index) => {
        return (
          <div key={index} className={"each-cusine-list"}>
            <span className={"icon"}>&#9832;&nbsp;</span>
            {el}&nbsp;
          </div>
        );
      })}
    </div>
  );
};

const ShowCusine = props => {
  console.log(props);
  if (props.cusinie == undefined) return null;
  return (
    <div className={"cusine-list"}>
      {props.cusinie.map((el, index) => {
        return (
          <div key={index} className={"each-cusine-list"}>
            <span className={"icon"}>&#9832;&nbsp;</span>
            {el}&nbsp;
          </div>
        );
      })}
    </div>
  );
};
