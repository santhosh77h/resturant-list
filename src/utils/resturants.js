import _ from "underscore";

import { allResturants } from "../assets/restuarants";

import qs from "querystring";

const host = "api/";

//let allResturants = require("../assets/restuarants");

let allResturantsResults = allResturants.map(el => {
  if (el["Cuisine Style"] && el["Cuisine Style"].length > 3) {
    el["Cuisine Style"] = JSON.parse(el["Cuisine Style"].replace(/'/g, '"'));
  } else el["Cuisine Style"] = [];

  return el;
});

export const top15 = () => {
  var results = _.chain(allResturants)
    .sortBy(function(item) {
      return item.Ranking;
    })
    .first(15)
    .value();

  return results;
};

export const top30 = () => {
  var results = _.chain(allResturants)
    .sortBy(function(item) {
      return item.Ranking;
    })
    .first(30)
    .value();

  return results;
};

export const getCuisine = () => {
  let cusines = {};

  _.forEach(allResturantsResults, el => {
    _.forEach(el["Cuisine Style"], item => {
      if (cusines[item]) {
        cusines[item] = cusines[item] + 1;
      } else cusines[item] = 1;
    });
  });

  return cusines;
};

export const searchCuisine = (
  cuisineSelected,
  page,
  searchquery,
  filterby,
  toprated
) => {
  return new Promise((resolve, reject) => {
    let query_obj = {
      cuisineSelected,
      page,
      searchquery,
      filterby,
      toprated
    };
    const query = qs.stringify(query_obj);

    fetch(host + "restuarants?" + query)
      .then(response => {
        console.log(response);
        setTimeout(() => null, 5); // this  is the workaround data not loading fast enough
        return response.json();
      })
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
};
