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