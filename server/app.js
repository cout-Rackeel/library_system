//Packages
require("dotenv").config();
const express = require('express');
const app = express();
var path = require('path');
var expressLayout = require('express-ejs-layouts')
var cookieParser = require('cookie-parser');
const morgan = require('morgan');
var cors = require('cors');
const session = require('express-session');
const moment = require('moment');
var flash = require('express-flash');
var rateLimit = require('express-rate-limit');
app.locals.moment = moment;
const AppError = require('./utils/errors/AppError.js');


require('./db.js')// Connects to database

const PORT = process.env.APP_PORT || 8080;

//Routes
const indexRouterV1 = require('./routes/v1/indexRouter.js');
const indexApiRouterV1 = require('./routes/v1/indexApi.js');
const indexRouterV2 = require('./routes/v2/indexRouter.js');
const indexApiRouterV2 = require('./routes/v2/indexApi.js');
const { errorHandler } = require("./middleware/v1/errorHandler.js");

//SET APP
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname ,'views'));

//SET Layouts
app.set('layout' , 'layouts/layout');
app.use(expressLayout);

//Setting up Public
app.use(express.static(path.join(__dirname , '..' ,'client/public')))
app.use(express.static(path.join(__dirname , 'partials')))

//Setting up Middleware for Parsing JSON & URLENCODED data
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Setting up additional Middleware
app.use(morgan('tiny')); // Logging


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { status: "error", message: "Too many requests, please try again later." },
});

app.use(limiter); // Limit Amount of request per

// Setting up Session and Flash
app.use(cookieParser());
app.use(session({
  secret:'M1O2mb103jum&1o/',
  resave: false,
  saveUninitialized: true,
  cookie : {maxAge : 1200000}
}));

app.use(flash());

// Setting up Routing middleware
// app.use('/main/v1',  indexRouterV1);
// app.use('/api/v1',  indexApiRouterV1);

app.use('/',  indexRouterV2);
app.use('/api/v2',  indexApiRouterV2);


// Catch-all for undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorHandler); // Global Error Handling


// Handles uncaught exceptions (synchronous error which are never caught using try/catch).
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message);
  process.exit(1); // Exit to prevent an unstable state
});

// Handles unhandled promise rejections (async errors outside Express)
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err.message);
  process.exit(1);
});


const currentVersion = 'v2';
// Listening to Port
// app.listen(PORT , () => console.log(`Listening on port ${PORT} || http://localhost:5500/main/${currentVersion} ...`))

module.exports = app;

