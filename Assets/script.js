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

      for (i = 0; i < 5; i++){
      var title = data.Search[i].Title;
      var poster = data.Search[i].Poster;
      var year = data.Search[i].Year;
      var imdbId = data.Search[i].imdbID;

    var movieDiv = $('<div>');

    movieDiv.attr('class', 'movie-div');

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

    
    moreInfo.on('click', function () {
      
      $(".more-info-btn").css('display', 'none');
          var title = $(this).data('title');
          var imdbId = $(this).data('imdbID');

    // create add to watchlist button
    var saveToWatchListBtn = $('<button>');

      for (i = 0; i < 4; i++){
      var movieDiv = $(this).closest('.movie-div');
      movieDiv.attr('id', 'active');
      $('.movie-div').not('#active').hide();
      apiMovieNightFetch(imdbId)
      }
    omdbPlotFetch(imdbId);
  })

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



  function omdbPlotFetch(movie){
    var searchUrl = 'http://www.omdbapi.com/';
    var apiKey = '?apikey=f0621784';
    var movieName = "&i=" + movie;
    var addParam = '&plot=full'
    var url = searchUrl + apiKey + addParam + movieName;
    console.log(url);
    fetch(url)
    .then(function(response){
      return response.json();
    })
    .then(function(data) {
      console.log(data)
      var plot = data.Plot;
      var plotEl = $('<p>');
      console.log(plot)

      plotEl.text(plot);
  
      $('#movie-info').append(plotEl);
      })}


      var saveToWatchListBtn = $('<button>');

      saveToWatchListBtn.attr('class', 'favorites-btn');
    
      saveToWatchListBtn.text('Save to Watchlist ⭐');
    
      movieDiv.append(saveToWatchListBtn)

var watchListFavorites = []

if(localStorage.getItem('favoritesWatchList')) {
  watchListFavorites = JSON.parse(localStorage.getItem('favoritesWatchList'));
  console.log(watchListFavorites);
  printWatchlist();
}

function printWatchlist() {
  // cityHistoryDisplayEl.html('');
  for (var i = 0; i < watchListFavorites.length; i++) {
      favorite = watchListFavorites[i];
      // console.log(city);
      var listEl = $('<li>');
      var listBtns = $('<button>');
      listBtns.attr("data-movie", favorite);
      listBtns.attr("class", "button");
      listBtns.text(favorite);
      cityHistoryDisplayEl.append(listEl);  
      listEl.append(listBtns);
  }
}

function captureFavoriteMovie(event){
  event.preventDefault();
  // console.log(event);
  // console.log(event.target);
  watchListFavorites.push(searchInput.val());
  if (watchListFavorites.length > 20){
    watchListFavorites.shift();
  }
  localStorage.setItem('favoritesWatchList', JSON.stringify(watchListFavorites));
  printWatchlist();
}


function handleButtonClick(event){
  event.preventDefault();
  // console.log(this);
  var movie = this.getAttribute("data-movie");
  console.log(movie);
    omdbFetch(movie);
  }

// // not sure where.on("click", "button", handleButtonClick)
