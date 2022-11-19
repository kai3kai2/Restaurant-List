const Restaurant = require('../restaurant')
const restaurantData = require('./restaurant.json').results
const db = require('../../config/mongoose')

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