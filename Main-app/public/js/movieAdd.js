let movieAddbutton = document.getElementById('display-form');

movieAddbutton.addEventListener('submit', function(e){
    e.preventDefault();
    
    let inputTitle = document.getElementById('input-title');
    let inputYear = document.getElementById('input-year');
    let inputDirector = document.getElementById('input-director');
    let inputPlot = document.getElementById('input-plot');
    let inputRuntime = document.getElementById('input-runtime');
    let inputGenre = document.getElementById('input-genre');
    let inputPoster = document.getElementById('movie-poster');

    let data = {
        title           :  inputTitle.value,
        release_year    :  inputYear.value,
        director        :  inputDirector.value,
        plot            :  inputPlot.value,
        runtime         :  inputRuntime.value,
        genre           :  inputGenre.value,
        poster          :  inputPoster.value
    };

    console.log('movieAdd title: '+data.title);
    console.log('movieAdd year: '+data.release_year);
    console.log('movieAdd director: '+data.director);
    console.log('movieAdd plot: '+data.plot);
    console.log('movieAdd runtime: '+data.runtime);

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", '/add-movie', true);
    xhttp.setRequestHeader("Content-type", "application/json")    

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log("Response received: ", xhttp.responseText);
            sendToCatalogPage();
        }
        if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    }

    xhttp.send(JSON.stringify(data));

});

function sendToCatalogPage(){
    let url = `/movie_catalog`;
    window.location.href = url;
}
