// load express
const express = require("express");
const session = require("express-session");

// load handlebars
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const flash = require("connect-flash");

const routes = require("./routes");

const usePassport = require("./config/passport");
require("./config/mongoose");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();
const port = 3000;

// set handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));

app.use(
  session({
    secret: "ThisIsMySecret",
    resave: false,
    saveUninitialized: true,
  })
);

app.set("view engine", "handlebars");

// get js/cs file path
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

usePassport(app);
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.warning_msg = req.flash("warning_msg");
  next();
});

app.use(routes);

// server listen
app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`);
});
