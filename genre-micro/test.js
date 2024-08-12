const axios = require('axios');

const url = 'http://localhost:4500/genre';

const movies = [
    {id: 1, title: 'The Godfather', genre : 'drama, crime'
    },
    {id: 2, title: '2001: A space', genre : 'science fiction'
    },
    {id: 3, title: 'Airplan!', genre : 'comedy'
    },
    {id: 4, title: 'Kramer vs. Kramer', genre : 'drama'
    }
]

let genre = 'science fiction'

const params = {
    movies: movies,
    genre: genre
}

axios.get(url, { params })
.then(response => {
    console.log(response.data);
})
.catch(error => {
    console.error('error making request:', error);
});