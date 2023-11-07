var searchBtn = document.getElementById('search-button');
$('.reset-btn-div').css('display', 'none');

function omdbFetch(movie){
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
      for (var i = 0; i < 5 && i < data.Search.length; i++){
      var title = data.Search[i].Title;
      var poster = data.Search[i].Poster;
      var year = data.Search[i].Year;
      var imdbId = data.Search[i].imdbID;

    var movieDiv = $('<div>');

    movieDiv.attr('id', 'movie-div');

    $('#movie-info').append(movieDiv);

    // //creates poster
    var imgEl = $('<img>');

    imgEl.attr('src', poster);

    movieDiv.append(imgEl);

    // //creates title
    var titleEl = $('<h3>');

    titleEl.text(title);

    movieDiv.append(titleEl);

    // //creates description
    var yearEl = $('<p>');

    yearEl.text(year);


    movieDiv.append(yearEl);

    // creates more info button
    var moreInfo = $('<button>');

    moreInfo.attr('class', 'more-info-btn');

    moreInfo.text('See more info');

    moreInfo.data('imdbID', imdbId);

    movieDiv.append(moreInfo);

     // creates streaming options button
    var streamingOpt = $('<button>');

    streamingOpt.attr('id', 'streaming-opt-btn');

    streamingOpt.text('Where to watch?');

    streamingOpt.data('title', title);

    streamingOpt.data('imdbID', imdbId);
    
    movieDiv.append(streamingOpt);


    streamingOpt.on('click', function () {
      // Retrieve the movie details from the data attributes
      var title = $(this).data('title');
      var imdbId = $(this).data('imdbID');
    
      // Now you can use the 'title' and 'year' variables for further processing.
      console.log(title);
      console.log(imdbId);
    
      // You can display the details in a modal, perform an AJAX request, or any other desired action here.
      apiMovieNightFetch(imdbId);
    });

      }
    })

  };

  searchBtn.addEventListener('click', function(){
    $(".main-info-box").css('display', 'none');
    $('.reset-btn-div').css('display', 'flex');
      var searchValue = document.getElementById('search').value;
      omdbFetch(searchValue);
  })

  $('#reset-button').on('click', function(){
    location.reload();
  })


// fetch movie of the night
async function apiMovieNightFetch(movie) {
  const urlStart = 'https://streaming-availability.p.rapidapi.com/get?output_language=en&imdb_id='
  const searchPara = movie
  // const urlEnd = '&country=us&show_type=all&output_language=en'
  var urlMovieOfTheNight = urlStart + searchPara;

  const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '2f43227628msh7e02f532e1891e0p188cd9jsndd7637ba78ac',
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
      }
    };
   
    let movies;
    
    try {
      const response = await fetch(urlMovieOfTheNight, options);
      movies = await response.json();
      console.log(movies.result);  
    } catch (error) {
        console.error(error);
    } 

    for (let i = 0; i < movies.result.streamingInfo.us.length; i++){
      var streamingService = movies.result.streamingInfo.us[i].service;
      var streamingLink = movies.result.streamingInfo.us[i].link;
      var qualityType = movies.result.streamingInfo.us[i].quality;
      if (qualityType == undefined){
        qualityType = 'See it on the website'
      };

      // append streaming service info to movies
      var streamingDiv = $("<div>");
      streamingDiv.attr('id', 'streaming-div');
      $('#movie-info').append(streamingDiv);

      var streamingUl = $('<ul>');
      streamingUl.attr('id', 'stream-ul');
      
      var streamingLinkEl = $('<a>');
      streamingLinkEl.attr('href', streamingLink);
      streamingDiv.append(streamingLinkEl);

      var streamingServiceEl = $('<li>');
      streamingServiceEl.text("Stream it on: " + streamingService + ' Quality: ' + qualityType);
      streamingUl.append(streamingServiceEl);

      $(streamingLinkEl).append(streamingServiceEl);
    }
  }