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

app.use(express.static('public/css'));

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/landing_page', function(req, res){
    res.render('landing_page')
})

app.get('/help_page', function(req, res){
    res.render('help')
})

app.get('/movie_search', function(req, res){
    res.render('movie_search');
})

app.get('/search-movie', function(req, res){
    const { title, year } = req.query;

    const params = {
        title: title,
        year: year
    }

    axios.get('http://localhost:4000/search', { params })
    .then(response => {
        console.log(response.data);
        res.send(response.data);
    })
    .catch(error => {
        console.error('error making request:', error);
    });
});

app.post('/add-movie', function(req, res){
    let data = req.body;
    console.log("made it here: ");
    console.log("testing: "+data.title);
    console.log("testing: "+data.runtime);
    console.log("testing poster: "+data.poster);

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

app.delete('/delete-movie', function(req, res){
    let data = req.body;
    let movie_ID = parseInt(data.id);
    console.log("Movie being deleted: "+movie_ID);
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

app.get('/movie_catalog', function(req, res){
    let query1 = `SELECT movie_ID, title as Title, release_year as Year, rating as Rating, genre FROM Movie;`

    db.pool.query(query1, function(error, rows, fields){
        console.log("selected movies: " )
        rows.forEach(function(row){
            console.log(row)            
;        });
        
        console.log("test before parse ")
        let movies = rows;
        console.log("parsed movies: "+movies);
        console.log("test after parse ")
        let genreList = []
        for(i=0; i < movies.length; i++){
            let temp = movies[i].genre.split(", ");
            for (j=0; j < temp.length; j++){
                if (!genreList.includes(temp[j])){
                    genreList.push(temp[j]);
                }
            }
        }            

        console.log("Genre list: "+genreList);
        return res.render('movie_catalog', {data: rows, genre : genreList});
   })
});

app.get('/genre_filter', function(req, res){
    let genre = req.query.param1;
    let query1 = `SELECT movie_ID, title as Title, release_year as Year, rating as Rating, genre FROM Movie;`

    db.pool.query(query1, function(error, rows, fields){
        const params = {
            movies: rows,
            genre: genre
        }
        
        axios.get('http://localhost:4500/genre', { params })
        .then(response => {
            console.log(response.data);
            let genreList = getGenreList(rows);
            return res.render('movie_genre_filter', {data: response.data, genre : genre, list: genreList});
        })
        .catch(error => {
            console.error('error making request:', error);
        });

    });
});

app.get('/top_five', function(req, res){
    let query1 = `SELECT movie_ID, title as Title, release_year as Year, rating, genre FROM Movie;`
    const url = 'http://localhost:4075/api/topmovies';

    db.pool.query(query1, function(error, rows, fields){    

        axios.post(url,  rows)
        .then(response => {
            console.log('Response:', response.data);
            return res.render('movies_top_five', {data: response.data})
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
    });
});

app.get('/movie_stats', function(req, res){
    let query1 = `SELECT movie_ID, title as Title, release_year as Year, rating, genre FROM Movie;`
    const url = 'http://localhost:4700/stats';

    db.pool.query(query1, function(error, rows, fields){
    

        axios.post(url,  rows)
        .then(response => {
            console.log('Response:', response.data);
            let aveRating = Number(response.data[2]);
            console.log("The ave rating is: ",aveRating);
            return res.render('movies_stats', {data: response.data, ave: aveRating})
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
    });

});

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

app.put('/delete-review', function(req, res){
    let data = req.body;
    let movie_ID = parseInt(data.id);
    console.log("Movie being deleted: "+movie_ID);

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


app.listen(PORT, () => {
    console.log(`Service A listening on port ${PORT}`);
  });