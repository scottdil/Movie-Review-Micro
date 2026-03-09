var express = require('express');
var db = require('../database/db-connecter');
const axios = require('axios');
var router = express.Router();

router.get('/movie_details', function(req, res){ 
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


router.put('/delete-review', function(req, res){
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

router.get('/movie-review', function(req, res){ 
    movie_ID = req.query.param1;
    let query1 = `SELECT movie_ID, title as Title, release_year as Year, director as Director,` +
        `plot as Synopsis, rating as Rating, review as Review FROM Movie WHERE movie_ID = ${movie_ID} `
    db.pool.query(query1, function(error, rows, fields){
        let movieInfo = rows[0];
        
        return res.render('movie_review', {data: movieInfo});
   })
})

router.put('/update-review', function(req, res){
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

module.exports = router;