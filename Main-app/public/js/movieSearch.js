
let movieSearchForm = document.getElementById('movie-search');

movieSearchForm.addEventListener('submit', function(e){
    e.preventDefault();
    
    let inputTitle = document.getElementById('title');
    let inputYear = document.getElementById('year');

    let data = {
        title: inputTitle.value,
        year: inputYear.value
    };

    
    let queryParams = new URLSearchParams(data).toString();

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", `/search-movie?${queryParams}`, true);
    

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log("Response received: ", xhttp.responseText);
            displayMovie(xhttp.response);
        }
        if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    }

    xhttp.send();

});

displayMovie = (data) => {
    let parsedData = JSON.parse(data);
    console.log('parsed data '+parsedData.Title);
    console.log('parsed data '+parsedData.Year);
    console.log('parsed data '+parsedData.Director);
    console.log('parsed data '+parsedData.Plot);
    console.log('Parsed data runtime:  '+parsedData.Runtime);
    console.log('Parsed data poster:  '+parsedData.Poster);

    let title = document.getElementById('input-title');
    let year = document.getElementById('input-year');
    let director = document.getElementById('input-director');
    let genre = document.getElementById('input-genre');
    let plot = document.getElementById('input-plot');
    let runtime = document.getElementById('input-runtime');
    let poster = document.getElementById('movie-poster');

    title.value = parsedData.Title;
    year.value = parsedData.Year;
    director.value = parsedData.Director;
    genre.value = parsedData.Genre;
    plot.value = parsedData.Plot;
    runtime.value = parsedData.Runtime;
    poster.value = parsedData.Poster;
    

    title.innerText = parsedData.Title;
    year.innerText = parsedData.Year;
    director.innerText = parsedData.Director;
    genre.innerText = parsedData.Genre;
    plot.innerText = parsedData.Plot;
    runtime.innerText = parsedData.Runtime;
    poster.src = parsedData.Poster;
    

}