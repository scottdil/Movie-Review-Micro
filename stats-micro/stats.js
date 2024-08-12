var express = require('express');

const app = express();
port = 4700;

app.use(express.json());

app.post('/stats', function(req, res){
    const movies = req.body;

    console.log("Received Movies: ", movies);

    const validMovies = movies.filter(movie => 
        typeof movie.rating === 'number');

    console.log("List of valid movies: ",validMovies)

    let topMovie = validMovies[0];
    let bottomMovie = validMovies[0];
    let ratingSum = validMovies[0].rating;

    for(i=1; i<validMovies.length; i++){
        console.log("checking movie ", validMovies[i].Title, " rating of ", validMovies[i].rating);
        ratingSum = ratingSum + Number(validMovies[i].rating);
        topNum = Number(topMovie.rating);
        bottomNum = Number(bottomMovie.rating); 
        currentNum = Number(validMovies[i].rating);  

        console.log("before Check Top num: ", topNum, " Bottom Num: ", bottomNum, " current num: ", currentNum)
        if ( topNum < currentNum) {
            topMovie = validMovies[i];
        } else if ( bottomNum > currentNum ){
            bottomMovie = validMovies[i];
        }
        console.log("after Check Top num: ", topNum, " Bottom Num: ", bottomNum, " current num: ", currentNum)
    }

    let aveRating = ratingSum / validMovies.length;
    aveRating = Math.floor(aveRating * 100) / 100;

    console.log("Highest movie: ", topMovie);
    console.log("Lowest rating: ", bottomMovie);
    console.log("The sum is: ", ratingSum);
    console.log("the number of fils: ",validMovies.length);
    console.log("The ave rating: ", aveRating);

    responseList = [topMovie, bottomMovie, aveRating];
    res.json(responseList);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    });