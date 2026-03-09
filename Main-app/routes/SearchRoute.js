var express = require('express');
var db = require('../database/db-connecter');
var router = express.Router();
const axios = require('axios');

router.get('/', function(req, res){
    const { title, year } = req.query;

    const params = {
        title: title,
        year: year
    }

    console.log("Sending request to search micro with parameters: ",params);

    axios.get('http://localhost:4000/search', { params })
    .then(response => {
        console.log("Response received from search-micro: ", response.data);
        res.send(response.data);
    })
    .catch(error => {
        console.error('error making request:', error);
    });
});

module.exports = router;