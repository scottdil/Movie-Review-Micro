
function deleteMovieReview(movie_ID){
    let confirmation = confirm("Are you sure you wish to delete this movie? All information will be lost including movie review.");
    if (confirmation == false){
        return;

    }else{

        let link = '/delete-review';
        let data = {
        id: movie_ID
        };

        console.log("deleteMovieReview movie_ID: "+data.id);

        $.ajax({
            url: link,
            type: 'PUT',
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function(result) {
            deleteRow(movie_ID);       
            }
        });
    }
}

function deleteRow(movie_ID){
    let table = document.getElementById('movie-review-table');
    tableRow1 = table.getElementsByTagName('tr')[0];
    tableRow2 = table.getElementsByTagName('tr')[1];
    td1 = tableRow1.getElementsByTagName('td')[0];
    td2 = tableRow2.getElementsByTagName('td')[0];
    
    td1.innerHTML = "";
    td2.innerHTML = "";
}