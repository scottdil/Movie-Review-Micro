var express = require('express');
var db = require('../database/db-connecter');
var router = express.Router();

// display movie catalog
router.get('/', function(req, res){
    let query1 = `SELECT movie_ID, title as Title, release_year as Year, rating as Rating, genre FROM Movie;`

    db.pool.query(query1, function(error, rows, fields){
        
        let movies = rows;
        let genreList = getGenreList(movies);
        
        return res.render('movie_catalog', {data: rows, genre : genreList});
   })
});

router.post('/', function(req, res){
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

router.delete('/', function(req, res){
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