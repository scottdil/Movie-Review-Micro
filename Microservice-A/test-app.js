// test-app.js
// Import necessary modules
const axios = require('axios');

// Define the endpoint and the movie data to be sent
const url = 'http://localhost:4700/stats';

const movies = [
    { id: 1, name: 'Movie 1', Rating: 5 },
    { id: 2, name: 'Movie 2', Rating: 8 },
    { id: 3, name: 'Movie 3', Rating: 2 },
    { id: 4, name: 'Movie 4', Rating: 7 },
    { id: 5, name: 'Movie 5', Rating: 9 },
    { id: 6, name: 'Movie 6', Rating: 8 },
    { id: 7, name: 'Movie 7', Rating: 6 },
    { id: 8, name: 'Movie 8', Rating: 9.25 },
    { id: 9, name: 'Movie 9', Rating: 3 },
    { id: 10, name: 'Movie 10', Rating: 1.2 },
  ];

axios.post(url, {movies: movies})
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });