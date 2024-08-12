

function toMovieDetails(movie_ID){
    let link = '/movie_details';
        let data = {
        id: movie_ID
        };

    $.ajax({
        url: link,
        type: 'GET',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result) {  
        }
    });
}