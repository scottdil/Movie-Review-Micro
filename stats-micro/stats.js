var express = require('express');

const app = express();
port = 4700;

app.use(express.json());

app.post('/stats', function(req, res){
    const movies = req.body;

    console.log("Received Movies: ", movies);

    const validMovies = movies.filter(movie => 
        typeof movie.rating === 'number');

    let topMovie = validMovies[0];
    let bottomMovie = validMovies[0];
    let ratingSum = validMovies[0].rating;

    for(i=1; i<validMovies.length; i++){
        ratingSum = ratingSum + Number(validMovies[i].rating);
        topNum = Number(topMovie.rating);
        bottomNum = Number(bottomMovie.rating); 
        currentNum = Number(validMovies[i].rating);  

        if ( topNum < currentNum) {
            topMovie = validMovies[i];
        } else if ( bottomNum > currentNum ){
            bottomMovie = validMovies[i];
        }
    }

    let aveRating = ratingSum / validMovies.length;
    aveRating = Math.floor(aveRating * 100) / 100;

    responseList = [topMovie, bottomMovie, aveRating];
    console.log("Sending response of array [top movie, bottom movie, ave ratring", responseList)
    res.json(responseList);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    });