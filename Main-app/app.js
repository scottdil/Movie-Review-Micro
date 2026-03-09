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

/*
app.get('/', function(req, res) {
    res.render('index');
});

app.get('/landing_page', function(req, res){
    res.render('landing_page')
});

app.get('/help_page', function(req, res){
    res.render('help')
});

app.get('/movie_search', function(req, res){
    res.render('movie_search');
});
*/

/*
    app.get('/search-movie' - calls search-micro service to make API request to search for a moview
*/

var movieSearch = require('./routes/SearchRoute.js')
app.use('/search-movie', movieSearch)

/*
app.get('/search-movie', function(req, res){
    const { title, year } = req.query;

    const params = {
        title: title,
        year: year
    }

    console.log("Sending request to search micro with parameters: ",params);

    axios.get('http://localhost:4000/search', { params })
    .then(response => {
        console.log("Response received from search-micro: ", response.data);
        res.send(response.data);
    })
    .catch(error => {
        console.error('error making request:', error);
    });
});
*/

/*
    app.post('/add-movie' - adds movie to catalog
*/

var moviesRoute = require('./routes/MovieCatalog.js')
app.use('/add-movie', moviesRoute)

/*
app.post('/add-movie', function(req, res){
    let data = req.body;

    let query1 = 'INSERT INTO Movie (title, release_year, director, plot, runtime, genre, poster) VALUES (?, ?, ?, ?, ?, ?, ?)'
    
    db.pool.query(query1, [data.title, data.release_year, data.director, data.plot, data.runtime, data.genre, data.poster], 
        function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);

        }else{
            res.send(rows);
        }
    });
});
*/

/*
    app.delete('/delete-movie' - deletes movie from catalog
*/
app.use('/delete-movie', moviesRoute)
/*
app.delete('/delete-movie', function(req, res){
    let data = req.body;
    let movie_ID = parseInt(data.id);
    let query1 = `DELETE FROM Movie WHERE movie_ID = ${movie_ID}`

    db.pool.query(query1, function(error, rows, fields){
        if (error){
            console.log(error);
            res.sendStatus(400);
        }else{
            res.sendStatus(204);
        }
    });
});
*/

/*
    app.get('/movie_catalog' - displays movies in catalog
*/
app.use('/movie_catalog', moviesRoute)

/*
app.get('/movie_catalog', function(req, res){
    let query1 = `SELECT movie_ID, title as Title, release_year as Year, rating as Rating, genre FROM Movie;`

    db.pool.query(query1, function(error, rows, fields){
        
        let movies = rows;
        let genreList = getGenreList(movies);
        
        return res.render('movie_catalog', {data: rows, genre : genreList});
   })
});
*/

/*
    app.get('/genre_filter' - Calls genre-micro service to display movies by genre type
*/

var genreRoute = require('./routes/GenreFilter.js')
app.use('/genre_filter', genreRoute)

/*
app.get('/genre_filter', function(req, res){
    let genre = req.query.param1;
    let query1 = `SELECT movie_ID, title as Title, release_year as Year, rating as Rating, genre FROM Movie;`

    db.pool.query(query1, function(error, rows, fields){
        const params = {
            movies: rows,
            genre: genre
        }
        console.log("Sending request to genre-micro, with parameters: ", params)
        axios.get('http://localhost:4500/genre', { params })
        .then(response => {
            console.log("Received response from genre-micro: ",response.data);
            let genreList = getGenreList(rows);
            return res.render('movie_genre_filter', {data: response.data, genre : genre, list: genreList});
        })
        .catch(error => {
            console.error('error making request:', error);
        });

    });
});
*/

/*
    app.get('/top_five' - Calls MicroserviceA to pull up the top 5 movies
*/

var topFiveRoute = require('./routes/TopFive.js')
app.use('/top_five', topFiveRoute)

/*
app.get('/top_five', function(req, res){
    let query1 = `SELECT movie_ID, title as Title, release_year as Year, rating, genre FROM Movie;`
    const url = 'http://localhost:4075/api/topmovies';

    db.pool.query(query1, function(error, rows, fields){    

        console.log("Sending request to MicroserviceA, with parameters: ", rows)
        axios.post(url,  rows)
        .then(response => {
            console.log('Received response from MicroserviceA:', response.data);
            return res.render('movies_top_five', {data: response.data})
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
    });
});
*/

/*
    app.get('/movie_stats' - Calls stats-micro service to display stats page, showing top, low, and ave movie
*/

var statsRoute = require('./routes/StatsRoute.js')
app.use('/movie_stats', statsRoute)

/*
app.get('/movie_stats', function(req, res){
    let query1 = `SELECT movie_ID, title as Title, release_year as Year, rating, genre FROM Movie;`
    const url = 'http://localhost:4700/stats';

    db.pool.query(query1, function(error, rows, fields){
    
        console.log("Sending request to stats-micro, with parameters: ", rows)
        axios.post(url,  rows)
        .then(response => {
            console.log('Received response from stats-micro:', response.data);
            let aveRating = Number(response.data[2]);
            return res.render('movies_stats', {data: response.data, ave: aveRating})
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
    });
});
*/

/*
Routes for Movie Reivews:
    app.get('/movie_details' - details for movie and pulls up review page
    app.put('/delete-review' - deletes the rating and review for movie
    app.get('/movie-review' - gets the user review for specific movie
    app.put('/update-review' - updates rating and review for a movie
*/

var reviewRoute = require('./routes/ReviewRoute.js')
app.use('/', reviewRoute)
/*
app.get('/movie_details', function(req, res){ 
    movie_ID = req.query.param1;
    let query1 = `SELECT movie_ID, title as Title, release_year as Year, director as Director,` +
        `plot as Synopsis, rating as Rating, review as Review, runtime as Runtime, genre as Genre, poster FROM Movie WHERE movie_ID = ${movie_ID} `
    db.pool.query(query1, function(error, rows, fields){
        let movieInfo = rows[0];
        if (!movieInfo.Review){
            movieInfo.review = '';
        }else{
            movieInfo.Review = movieInfo.Review.replace(/\n/g, '<br>');
        }
        return res.render('movie_details', {data: movieInfo});
   })
})

var reviewRoute = require('./routes/ReviewRoute.js')
app.use('/', reviewRoute)

//app.use('/update-review', reviewRoute)

/*
app.put('/delete-review', function(req, res){
    let data = req.body;
    let movie_ID = parseInt(data.id);

    let query1 = 'UPDATE Movie SET rating = NULL, review = NULL WHERE movie_ID = ?'

    db.pool.query(query1, [movie_ID], function(error, rows, fields){
        if (error){
            console.log(error);
            res.sendStatus(400);
        }else{
            res.sendStatus(204);
        }
    });
});

app.get('/movie-review', function(req, res){ 
    movie_ID = req.query.param1;
    let query1 = `SELECT movie_ID, title as Title, release_year as Year, director as Director,` +
        `plot as Synopsis, rating as Rating, review as Review FROM Movie WHERE movie_ID = ${movie_ID} `
    db.pool.query(query1, function(error, rows, fields){
        let movieInfo = rows[0];
        
        return res.render('movie_review', {data: movieInfo});
   })
})

app.put('/update-review', function(req, res){
    let data = req.body;

    let query1 = `UPDATE Movie Set rating = ?, review = ? Where movie_ID = ?`

    db.pool.query(query1, [data.rating, data.review, data.movie_ID], function(error, rows, fields){

        if (error){
            console.log(error);
            console.log("query error ")
            res.sendStatus(400);

        }else{
            console.log("query success ")
            res.sendStatus(200);
        }
    });
});
*/

/*
function getGenreList(movies){

    let genreList = [];
    for(i=0; i < movies.length; i++){
        let temp = movies[i].genre.split(", ");
        for (j=0; j < temp.length; j++){
            if (!genreList.includes(temp[j])){
                genreList.push(temp[j]);
            }
        }
    }

    return genreList;
}
*/

app.listen(PORT, () => {
    console.log(`Service A listening on port ${PORT}`);
  });