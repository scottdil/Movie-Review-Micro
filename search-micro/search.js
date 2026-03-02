var express = require('express');
const axios = require('axios');
const apiKey = '370631c7'

const app = express();
port = 4000;

app.get('/search', function(req, res) {
    const { title, year } = req.query;

    console.log("Received request: ", title, year);

    axios.get('http://www.omdbapi.com/', { 
        params: {
            apikey: apiKey,
            t: title,
            y: year 
        }
     })
    .then(response => {
        console.log("Sending response: ",response.data);
        res.send(response.data);
    })
    .catch(error => {
        console.error('error making request:', error);
    });   
});

app.listen(port, () => {
    console.log(`server is listening on http://localhost:${port}`);
});
