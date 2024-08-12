// app.js
const express = require('express');
const app = express();
const port = 4075;

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to receive the list of movies and return top 5 highest rated
app.post('/api/topmovies', (req, res) => {
  const movies = req.body;

  console.log("Received Movies: ", movies);
 
  // Filter out movies with invalid rating values
  const validMovies = movies.filter(movie => 
    typeof movie.rating === 'number');

  // Sort valid movies by rating in descending order and get top 5
  const top5Movies = validMovies.sort((a, b) => b.rating - a.rating).slice(0, 5);

  console.log("Top movies: ",top5Movies);

  // Respond with the top 5 movies
  res.json(top5Movies);
});

// Start the server
app.listen(port, () => {
console.log(`Server is running on http://localhost:${port}`);
});