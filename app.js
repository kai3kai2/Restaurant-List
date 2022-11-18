// load express
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const routes = require('./routes')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// load handlebars
const exphbs = require('express-handlebars')
// load method-override
const methodOverride = require('method-override')

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
app.use(methodOverride('_method'))
app.use(routes)

// set restaurantList router


// server listen
app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${3000}`)
})