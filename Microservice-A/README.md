# MicroserviceA
CS361 Microservice A

Communication Contract: 
Please contact me via teams or email as an alternative. I check my teams after 5 on the weekdays and all day on the weekends. Please reach out immediately for assistance to give time for resolutions if our scheduels do not align. If urgent I am avaialbe by phone as well.

How to programatically REQUEST data:
You will hake the request using a REST api. This will require a post to the endpoint with a list of movies that need to be evaluated. 

Endpoint: /api/topmovies

Sample request body: 

const movies = [
    { id: 1, name: 'Movie 1', rating: 5 },
    { id: 2, name: 'Movie 2', rating: 10 },
    { id: 3, name: 'Movie 3', rating: 2 },
    { id: 4, name: 'Movie 4', rating: 7 },
    { id: 5, name: 'Movie 5', rating: 9 },
    { id: 6, name: 'Movie 6', rating: 8 },
    { id: 7, name: 'Movie 7', rating: 6 },
    { id: 8, name: 'Movie 8', rating: 4 },
    { id: 9, name: 'Movie 9', rating: 3 },
    { id: 10, name: 'Movie 10', rating: 1 },
  ];

Example call using axios:

axios.post(url, movies)
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });

How to programatically RECIEVE data:
You will recieve the results through the post request and recieve the top 5 values in json array.
