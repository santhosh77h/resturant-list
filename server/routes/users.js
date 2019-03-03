var express = require("express");
var router = express.Router();
const perPageResults = 30;
let _ = require("underscore");

let all_resturants = require("../assets/restuarant.json");

let allResturants = all_resturants.map(el => {
  if (el["Cuisine Style"] && el["Cuisine Style"].length > 3) {
    el["Cuisine Style"] = JSON.parse(el["Cuisine Style"].replace(/'/g, '"'));
  } else el["Cuisine Style"] = [];

  return el;
});

console.log(allResturants);

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.get("/restuarants", function(req, res) {
  console.log(req.query);

  let { cuisineSelected, page, searchquery, filterby } = req.query;
  let result = [];
  // const cusinies = [];
  // if (cuisineSelected) {
  //   if (Array.isArray(cuisineSelected)) {
  //     cusinies = [...cuisineSelected];
  //   } else cusinies = [cusinies];
  // }
  const skip = (page - 1) * perPageResults;

  if (filterby == "toprated") {
    result = _.sortBy(allResturants, el => {
      if (el["Number of Reviews"] && el["Number of Reviews"] > 0) {
        return -el["Number of Reviews"];
      }
      return 0;
    });
    return res.send({
      type: "success",
      result: result.slice(skip, perPageResults)
    });
  }

  if (
    filterby == "cuisine" ||
    (cuisineSelected && cuisineSelected.length > 0)
  ) {
    result = allResturants.filter(el => {
      return (
        el["Cuisine Style"].findIndex(el => {
          return el == cuisineSelected;
        }) != -1
      );
    });
  }

  if (filterby == "search" || (searchquery && searchquery.length > 0)) {
    searchquery = searchquery.toLowerCase();
    var re = new RegExp(searchquery, "g");
    result = allResturants.filter(el => {
      if (el["Name"] && el["Name"].length > 0) {
        return el["Name"].toLowerCase().search(re) != -1;
      }
      return false;
    });
  }

  result = _.sortBy(result, el => {
    if (el["Number of Reviews"] && el["Number of Reviews"] > 0) {
      return -el["Number of Reviews"];
    }
    return 0;
  });

  console.log(result.slice(skip, perPageResults));
  res.send({ type: "success", result: result.slice(skip, perPageResults) });
});

module.exports = router;
