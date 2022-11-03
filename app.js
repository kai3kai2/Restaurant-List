// load express
const express = require('express')
const app = express()
const port = 3000

// load handlebars
const exphbs = require('express-handlebars')

// load restaurant data
const restaurantList = require('./restaurant.json')

// set handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// get js/cs file path
app.use(express.static('public'))

// set restaurantList router
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

// set restaurant information router 
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find((restaurant) => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

// set serch router and function
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const searchRestaurant = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword)
  })
  res.render('index', { restaurants: searchRestaurant, keyword: keyword })
})

// server listen
app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${3000}`)
})