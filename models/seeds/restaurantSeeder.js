const bcrypt = require("bcryptjs");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const Restaurant = require("../restaurant");
const restaurantData = require("./restaurant.json").results;
const db = require("../../config/mongoose");
const SEED_USER = {
  name: "user1",
  email: "user1@example.com",
  password: "12345678",
};

db.once("open", () => {
  // bcrypt
  //   .genSalt(10)
  //   .then((salt) => bcrypt.hash(SEED_USER.password, salt))
  //   .then((hash) =>
  //     user.create({
  //       name: SEED_USER.name,
  //       email: SEED_USER.email,
  //       password: hash,
  //     })
  //   )
  //   .then(user => {
  //     const userId = user._id
  //     for (let i = 0; i < 10; i++) {}

  //       })
  //     }
  //   })
  console.log("mongodb connected!");
  Restaurant.insertMany(restaurantData, { ordered: false })
    .then(() => {
      console.log("restaurantSeeder done!");
      db.close();
    })
    .catch((err) => console.log("done"));
});
