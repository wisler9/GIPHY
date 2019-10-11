$(document).ready(() => {
var topics = ["Dog", "Cat", "Bird", "Lion"];

var userInput = $("#buttons-view");
// function displayAnimals() {
// var animal = $(this).attr("data-name");
// on click function that setting up the listener
// $("this").on("click", function() {
// var queryURL = "https://api.giphy.com/v1/gifs/random?tag=burrito&api_key=p4ly4CHotZxq0ByEAyupf4MiOEb9XyVo";
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=p4ly4CHotZxq0ByEAyupf4MiOEb9XyVo&q="+userInput+"&limit=20&offset=0&rating=G&lang=en";

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
   
    // get the imageURL from the ajax response
    // var imageUrl = response.limit; 
    // var imageUrl = response.ratings;
    console.log(response);
    // creating and image element
    // var Images = $("<img>");
    // creating the attribute of the cat Image - src as image_url, alt as image cat
    // catImage.attr("src", imageUrl);
    // catImage.attr("alt", "cat image");

    //adding the catImage to the HTML page to display
    // $("#images").prepend(catImage);
    
  });






  function makeButton(){
    for (var i=0;i<topics.length;i++){
        var newBtn = $("<button>");
        newBtn.text(topics[i]);
        newBtn.addClass("btn btn-info Animalbtns");
        newBtn.attr("data-topic",topics[i]);
        $(".giphy_btns").append(newBtn);
    }    
}


$("#add_btn").on("click",function(event){
    event.preventDefault();

    var Animal = $("#Animal_inp").val().trim();
    topics.push(Animal);
    $(".giphy_btns").empty();
    makeButton();
    $("#Animal_inp").val("");
});

$(".giphy_btns").on("click",".Animalbtns",function(event){
    $(".gifs_group").empty();

    var searchTerm = $(this).attr("data-topic");
    console.log(searchTerm);
    var limit = 20;
    var rating;
    queryURL = baseURL + searchTerm + "&limit=" + limit + "&api_key=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        var cnt = 0;
        for (var i = 0; i < limit; i++){
            var newDiv = $("<div>");
            newDiv.attr("id", "Animal-div-"+cnt);
            newDiv.addClass("Animaldiv");
            newDiv.css("float","left");
            newDiv.css("margin-right","20px");
            rating = response.data[i].rating;
            newDiv.append("<p>"+rating);
            var divImage = $("<img>");
            divImage.addClass("Animalimg");
            divImage.attr("src",response.data[i].images.fixed_height_still.url);
            divImage.attr("data-still",response.data[i].images.fixed_height_still.url);
            divImage.attr("data-state","still");
            divImage.attr("data-animate",response.data[i].images.fixed_height.url);
            newDiv.append(divImage);
            $(".gifs_group").append(newDiv);
            cnt++;
        }

    })
    
});

$(document).on("click",".Animalimg",function(event){
    var state = $(this).attr("data-state");
    // console.log(state);
    if (state === "still"){
        $(this).attr("src",$(this).attr("data-animate"));
        $(this).attr("data-state","animate");
    } else if (state === "animate"){
        $(this).attr("src",$(this).attr("data-still"));
        $(this).attr("data-state","still");
    }
})


makeButton();


// });
// $("#buttons-view").prepend("<div>"+year+ "</div>");
// $("#buttons-view").prepend("<div>"+plot+ "</div>");
// $("#buttons-view").prepend("<div>"+ratings+ "</div>");
// $("#buttons-view").prepend("<img src="+moviePoster+">");

// }


// function renderButtons() {

//     // Deletes the movies prior to adding new movies
//     // (this is necessary otherwise you will have repeat buttons)
//     $("#buttons-view").empty();

//     // Loops through the array of movies
//     for (var i = 0; i < topic.length; i++) {

//       // Then dynamicaly generates buttons for each movie in the array
//       // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
//       var a = $("<button>");
//       // Adds a class of movie to our button
//       a.addClass("movie");
//       // Added a data-attribute
//       a.attr("data-name", topic[i]);
//       // Provided the initial button text
//       a.text(topic[i]);
//       // Added the button to the buttons-view div
//       $("#buttons-view").append(a);
//     }
//   }










});