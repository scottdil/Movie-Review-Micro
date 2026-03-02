var express = require('express');

const app = express();
port = 4500;


app.get('/genre', function(req, res){
    const {movies, genre} = req.query;

    
    console.log('Received genre to filter: '+genre);
    console.log("Movies received: ", movies);

    let genreMovies = []

    for (let i = 0; i < movies.length; i++) {
        let movieGenreList = movies[i].genre.split(", ");
        if (movieGenreList.includes(genre)){
            genreMovies.push(movies[i]);
        }
    }

    console.log("Sending response of filtered movies: ",genreMovies);
    res.json(genreMovies);
});


app.listen(port, () => {
    console.log(`server is listening on http://localhost:${port}`);
});