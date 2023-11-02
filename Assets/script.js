
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

  
  
  
  
  
  
function secondFetch(movie, year){
    var searchUrl = 'http://www.omdbapi.com/';
    var apiKey = '?apikey=f0621784';
    var movieName = "&t=" + movie;
    var movieYear = "&y=" + year;
    var additionalPar = '&plot=full'
    var url = searchUrl + apiKey + additionalPar + movieYear + movieName;
    console.log(url);
    fetch(url)
    .then(function(response){
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      var title = data.Title;
      var poster = data.Poster;
      var plot = data.Plot;
      console.log(plot);

    // //creates poster
    // var imgEl = $('<img>');

    // imgEl.attr('src', poster);

    // $('body').append(imgEl);

    // //creates title
    // var titleEl = $('<h1>');

    // titleEl.text(title)
     
    // $('body').append(titleEl);

    // //creates description
    // var descEl = $('<p>');

    // descEl.text(plot)
         
    // $('body').append(descEl);
           

    })

  };

  // var movie = 'lord of the rings'
  // var year = ' 2003'
  // secondFetch(movie, year);
