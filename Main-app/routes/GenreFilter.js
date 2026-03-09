var express = require('express');
var db = require('../database/db-connecter');
const axios = require('axios');
var router = express.Router();

router.get('/', function(req, res){
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

module.exports = router;