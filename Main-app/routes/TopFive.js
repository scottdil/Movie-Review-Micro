var express = require('express');
var db = require('../database/db-connecter');
const axios = require('axios');
var router = express.Router();

router.get('/', function(req, res){
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

module.exports = router;