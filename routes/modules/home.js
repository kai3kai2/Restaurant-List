const express = require("express");
const router = express.Router();
const User = require("../../models/user");

const Restaurant = require("../../models/restaurant");

router.get("/", (req, res) => {
  const userId = req.user._id;
  Restaurant.find({ userId })
    .lean()
    .sort({ _id: "asc" })
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.log(error));
});

// set serch router and function
router.get("/search", (req, res) => {
  const userId = req.user._id;
  const keyword = req.query.keyword.trim();
  Restaurant.find({ userId })
    .lean()
    .then((restaurants) => {
      const searchRestaurant = restaurants.filter((restaurant) => {
        return (
          restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
          restaurant.category.includes(keyword)
        );
      });
      if (!searchRestaurant.length) {
        res.render("searchNotFound", { keyword });
      } else {
        res.render("index", {
          restaurants: searchRestaurant,
          keyword: keyword,
        });
      }
    });
});

router.get("/sort/AtoZ", (req, res) => {
  const userId = req.user._id;
  Restaurant.find({ userId })
    .lean()
    .sort({ name: "asc" })
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.log(error));
});

router.get("/sort/ZtoA", (req, res) => {
  const userId = req.user._id;
  Restaurant.find({ userId })
    .lean()
    .sort({ name: "desc" })
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.log(error));
});

router.get("/sort/category", (req, res) => {
  const userId = req.user._id;
  Restaurant.find({ userId })
    .lean()
    .sort({ category: "asc" })
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.log(error));
});

router.get("/sort/region", (req, res) => {
  const userId = req.user._id;
  Restaurant.find({ userId })
    .lean()
    .sort({ region: "asc" })
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.log(error));
});
module.exports = router;
