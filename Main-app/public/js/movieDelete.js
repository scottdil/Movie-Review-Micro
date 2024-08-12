

function deleteMovie(movie_ID){
    let confirmation = confirm("Are you sure you wish to delete this movie? All information will be lost including movie review.");
    if (confirmation == false){
        return;

    }else{

        let link = '/delete-movie';
        let data = {
        id: movie_ID
        };

        console.log("deleteMovie movie_ID: "+data.id);

        $.ajax({
            url: link,
            type: 'DELETE',
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function(result) {
            deleteRow(movie_ID);       
            }
        });
    }
}

function deleteRow(movie_ID){
    let table = document.getElementById('movie-catalog-table');
    for (let i = 0, row; row = table.rows[i]; i++){
        if (table.rows[i].getAttribute('data-value') == movie_ID){
            table.deleteRow(i);
            break;
        }
    }
}

