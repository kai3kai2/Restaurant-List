const Restaurant = require('../restaurant')
const restaurantData = require('./restaurant.json').results
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')
  Restaurant.insertMany(restaurantData, { ordered: false })
    .then(() => {
      console.log("restaurantSeeder done!")
      db.close()
    })
    .catch(err => console.log('done'))
})