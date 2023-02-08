// load express
const express = require("express");
const session = require("express-session");
const usePassport = require("./config/passport");
const app = express();
const port = 3000;

// load handlebars
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");

const routes = require("./routes");
require("./config/mongoose");

// set handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(
  session({
    secret: "ThisIsMySecret",
    resave: false,
    saveUninitialized: true,
  })
);

// get js/cs file path
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

usePassport(app);

app.use(routes);

// server listen
app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${3000}`);
});
