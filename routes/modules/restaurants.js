const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/newRestaurant', (req, res) => {
  return res.render('newRestaurant')
})

// new restaurant function
router.post('/', (req, res) => {
  const newRestaurant = req.body
  return Restaurant.create(newRestaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//  restaurant information function 
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// edit function
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const restaurantData = req.body
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.id = restaurantData.id
      restaurant.name = restaurantData.name
      restaurant.name_en = restaurantData.name_en
      restaurant.category = restaurantData.category
      restaurant.image = restaurantData.image
      restaurant.location = restaurantData.location
      restaurant.phone = restaurantData.phone
      restaurant.google_map = restaurantData.google_map
      restaurant.rating = restaurantData.rating
      restaurant.description = restaurantData.description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// delete function
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then((restaurant) => {
      restaurant.remove()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// set serch router and function
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  Restaurant.find()
    .lean()
    .then(restaurants => {
      const searchRestaurant = restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword)
      })
      if (!searchRestaurant.length) {
        res.render('searchNotFound', { keyword })
      } else {
        res.render('index', { restaurants: searchRestaurant, keyword: keyword })
      }
    })
})
module.exports = router