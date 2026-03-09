// Setup
var express = require('express');
const axios = require('axios');
const path = require('path');


var app = express();
PORT = 5000;

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars'); 
const helpers = require('handlebars-helpers')();    
app.engine('.hbs', engine({extname: ".hbs", helpers: helpers}));  
app.set('view engine', '.hbs');   
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))


var db = require('./database/db-connecter')
var mysql = require('mysql');
const { Console } = require('console');

app.use(express.static('public/css'));

/*
    app.get('/' - welcome page
    app.get('/landing_page' - landing page for app
    app.get('/help_page' - help page for app
    app.get('/movie_search' - form for movie search
*/
var pageRoutes = require('./routes/PagesRoute.js');
app.use('/', pageRoutes);

//app.get('/search-movie' - calls search-micro service to make API request to search for a moview
var movieSearch = require('./routes/SearchRoute.js')
app.use('/search-movie', movieSearch)

//app.post('/add-movie' - adds movie to catalog
var moviesRoute = require('./routes/MovieCatalog.js')
app.use('/add-movie', moviesRoute)

//app.delete('/delete-movie' - deletes movie from catalog
app.use('/delete-movie', moviesRoute)

// app.get('/movie_catalog' - displays movies in catalog
app.use('/movie_catalog', moviesRoute)

//app.get('/genre_filter' - Calls genre-micro service to display movies by genre type
var genreRoute = require('./routes/GenreFilter.js')
app.use('/genre_filter', genreRoute)

//app.get('/top_five' - Calls MicroserviceA to pull up the top 5 movies
var topFiveRoute = require('./routes/TopFive.js')
app.use('/top_five', topFiveRoute)

//app.get('/movie_stats' - Calls stats-micro service to display stats page, showing top, low, and ave movie
var statsRoute = require('./routes/StatsRoute.js')
app.use('/movie_stats', statsRoute)

/*
Routes for Movie Reivews:
    app.get('/movie_details' - details for movie and pulls up review page
    app.put('/delete-review' - deletes the rating and review for movie
    app.get('/movie-review' - gets the user review for specific movie
    app.put('/update-review' - updates rating and review for a movie
*/
var reviewRoute = require('./routes/ReviewRoute.js')
app.use('/', reviewRoute)

app.listen(PORT, () => {
    console.log(`Service A listening on port ${PORT}`);
  });