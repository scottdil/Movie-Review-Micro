let updateReviewForm = document.getElementById('review-form');

updateReviewForm.addEventListener("submit", function (e){
    e.preventDefault();

    console.log("Made it to the reivew event listeneer ")
    let ID = document.getElementById('ID');
    let rat = document.getElementById('input-rating');
    let rev = document.getElementById('input-review');

    let data = {
        movie_ID : ID.value,
        rating : rat.value,
        review : rev.value
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-review", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            goToCatalog(data.movie_ID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input SUIIII.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

function goToCatalog(movie_ID){
    let url = `/movie_details?param1=${movie_ID}`;
    window.location.href = url;
}