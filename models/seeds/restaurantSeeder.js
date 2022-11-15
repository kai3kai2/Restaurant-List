const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantData = require('./restaurant.json').results


require('dotenv').config()

mongoose.connect(process.env.MONGODB_URL, { useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < restaurantData.length; i++) {
    Restaurant.create(
      {
        id: `${restaurantData[i].id}`,
        name: `${restaurantData[i].name}`,
        name_en: `${restaurantData[i].name_en}`,
        category: `${restaurantData[i].category}`,
        image: `${restaurantData[i].image}`,
        location: `${restaurantData[i].location}`,
        phone: `${restaurantData[i].phone}`,
        google_map: `${restaurantData[i].google_map}`,
        rating: `${restaurantData[i].rating}`,
        description: `${restaurantData[i].description}`
      }
    )
  }
  console.log('done')
})