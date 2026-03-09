var express = require('express');
var db = require('../database/db-connecter');
const axios = require('axios');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('index');
});

router.get('/landing_page', function(req, res){
    res.render('landing_page')
});

router.get('/help_page', function(req, res){
    res.render('help')
});

router.get('/movie_search', function(req, res){
    res.render('movie_search');
});

module.exports = router;