<<<<<<<<< Temporary merge branch 1
function secondFetch(movie, year){
    var searchUrl = 'http://www.omdbapi.com/';
    var apiKey = '?apikey=f0621784';
    var movieName = "&s=" + movie;
    var url = searchUrl + apiKey + movieName;
    console.log(url);
    fetch(url)
    .then(function(response){
      return response.json();
    })
    .then(function(data) {
      for (i = 0; i < data.Search.length; i++){
      var title = data.Search[i].Title;
      var poster = data.Search[i].Poster;
      var year = data.Search[i].Year;

    // //creates poster
    var imgEl = $('<img>');

    imgEl.attr('src', poster);

    $('#movie-info').append(imgEl);

    // //creates title
    var titleEl = $('<h3>');

    titleEl.text(title);

    $('#movie-info').append(titleEl);

    // //creates description
    var yearEl = $('<p>');

    yearEl.text(year)

    $('#movie-info').append(yearEl);
      }
    })

  };

  // var movie = 'lord of the rings'
  // var year = ' 2003'
  // secondFetch(movie, year);
=========
var watchModeApiKey = 
var requestUrlWatchMode = 
var watchModeAddParameters = 
var searchButton = $('#searchBtn');

function getWatchModeLocation () {
    fetch('/Assets/title_id_map_watchmode.csv')
    .then(function (response){
        console.log(response)
        return response.text();
    })
    .then(function (data) {
        console.log(data)
        var lines = data.split("\n")
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            console.log(lines[i]);

        }
    })
    

}

searchButton.on("click", getWatchModeLocation)
>>>>>>>>> Temporary merge branch 2
