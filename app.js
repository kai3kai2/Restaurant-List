// load express
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// load handlebars
const exphbs = require('express-handlebars')

const Restaurant = require('./models/restaurant')

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection



// load restaurant data
// const restaurantList = require('./restaurant.json')

db.on('error', () => {
  console.log('mongodb error!')
})
// set connection succesfully
db.once('open', () => {
  console.log('mongodb connected!')
})

// set handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// get js/cs file path
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// set restaurantList router
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))

})

app.get('/restaurants/newRestaurant', (req, res) => {
  return res.render('newRestaurant')
})

// new restaurant function
app.post('/restaurants', (req, res) => {
  const newRestaurant = req.body
  return Restaurant.create(newRestaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//  restaurant information function 
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// edit function
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

app.post('/restaurants/:id/edit', (req, res) => {
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
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then((restaurant) => {
      restaurant.remove()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// set serch router and function
app.get('/search', (req, res) => {
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

// server listen
app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${3000}`)
})