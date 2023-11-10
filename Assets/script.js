var searchBtn = document.getElementById('search-button');
$('.reset-btn-div').css('display', 'none');
var savedWatchlistFullList = $('#full-watchlist')

function omdbFetch(movie) {
  var searchUrl = 'https://www.omdbapi.com/';
  var apiKey = '?apikey=f0621784';
  var movieName = "&s=" + movie;
  var url = searchUrl + apiKey + movieName;
  console.log(url);
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      for (i = 0; i < 5; i++) {
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

        // save to watchlist button
        var saveToWatchListBtn = $('<button>');
        saveToWatchListBtn.attr('data-movie', title);
        saveToWatchListBtn.attr('data-id', imdbId);
        saveToWatchListBtn.text('Save to Watchlist ⭐');
        movieDiv.append(saveToWatchListBtn);

        saveToWatchListBtn.on('click', captureFavoriteMovie);

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

          for (i = 0; i < 4; i++) {
            var movieDiv = $(this).closest('.movie-div');
            movieDiv.attr('id', 'active');
            $('.movie-div').not('#active').hide();
          }
          omdbPlotFetch(imdbId);
          apiMovieNightFetch(imdbId);
        })

      }
    })

};



searchBtn.addEventListener('click', function () {
  $(".main-info-box").css('display', 'none');
  $('.reset-btn-div').css('display', 'flex');
  var searchValue = document.getElementById('search').value;
  omdbFetch(searchValue);
})

$('#reset-button').on('click', function () {
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

  // Append streaming service info to movies
  var streamingDiv = $("<div>");
  streamingDiv.attr('id', 'streaming-div');
  $('#movie-info').append(streamingDiv);


  for (let i = 0; i < movies.result.streamingInfo.us.length; i++) {
    var streamingService = movies.result.streamingInfo.us[i].service;
    var streamingLink = movies.result.streamingInfo.us[i].link;
    var qualityType = movies.result.streamingInfo.us[i].quality;
    var streamTypeBuy = movies.result.streamingInfo.us[i].streamingType;
    var streamPriceAmount = movies.result.streamingInfo.us[i].price ? movies.result.streamingInfo.us[i].price.amount : null;
    if (!qualityType) {
      qualityType = 'See it on the website';
    }

    var streamingUl = $('<ul>');
    streamingUl.attr('id', 'stream-ul');
    streamingDiv.append(streamingUl);

    var streamingLinkEl = $('<a>');
    streamingLinkEl.attr('href', streamingLink);
    streamingLinkEl.text(" - Streaming Link");

    var streamingServiceEl = $('<li>');
    streamingServiceEl.text("Stream it on: " + streamingService + ' - Quality type: ' + qualityType + ' - ' + streamTypeBuy + ' - ' + (streamPriceAmount !== null ? '$' + streamPriceAmount : 'See it on the website'));

    
    streamingUl.append(streamingServiceEl);
    streamingUl.append(streamingLinkEl);
  };
}




function omdbPlotFetch(movie) {
  var searchUrl = 'https://www.omdbapi.com/';
  var apiKey = '?apikey=f0621784';
  var movieName = "&i=" + movie;
  var addParam = '&plot=full'
  var url = searchUrl + apiKey + addParam + movieName;
  console.log(url);
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      var plot = data.Plot;
      var plotEl = $('<p>');
      console.log(plot)

      plotEl.text(plot);

      $('#movie-info').append(plotEl);
    })
}





if (localStorage.getItem('favoritesWatchList')) {
  watchListFavorites = JSON.parse(localStorage.getItem('favoritesWatchList'));
  console.log(watchListFavorites);
  printWatchlist();
}

function printWatchlist() {
  savedWatchlistFullList.html("");
  for (var i = 0; i < watchListFavorites.length; i++) {
    favorite = watchListFavorites[i].split(',')[0];
    var movieId = watchListFavorites[i].split(',')[1];
    console.log(favorite)
    var listEl = $('<li>');
    var listBtns = $('<button>');
    listBtns.attr("data-movie", favorite);
    listBtns.attr('data-id', movieId)
    listBtns.attr("class", "button");
    listBtns.text(favorite);
    savedWatchlistFullList.append(listEl);
    listEl.append(listBtns);
    listBtns.on('click', handleButtonClick)
  }
}

function captureFavoriteMovie(event) {
  event.preventDefault();
  watchListFavorites = JSON.parse(localStorage.getItem('favoritesWatchList'));
  if (!watchListFavorites) {
    watchListFavorites = [];
  }
  var movieTitle = event.target.dataset.movie;
  var movieImbdId = event.target.dataset.id;
  var movieData = `${movieTitle}, ${movieImbdId}`
  // console.log(event);
  // console.log(event.target);
  watchListFavorites.push(movieData);
  if (watchListFavorites.length > 20) {
    watchListFavorites.shift();
  }
  localStorage.setItem('favoritesWatchList', JSON.stringify(watchListFavorites));
  printWatchlist();
}

function handleButtonClick(event) {
  event.preventDefault();
  // console.log(this);
  var movieBtn = event.target.dataset.movie;
  var imdbID = event.target.dataset.id;
  console.log(imdbID);
  // omdbFetch(imdbID);
  $('#movie-info').empty()
  omdbFetchAgainFullScreen(movieBtn);
  omdbPlotFetch(imdbID);
  apiMovieNightFetch(imdbID);

}

// reshow movie info on one page after clicking title button from saved watchlist 
function omdbFetchAgainFullScreen(movie) {
  var searchUrl = 'https://www.omdbapi.com/';
  var apiKey = '?apikey=f0621784';
  var movieName = "&s=" + movie;
  var url = searchUrl + apiKey + movieName;
  console.log(url);
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      for (i = 0; i < 1; i++) {
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

        // save to watchlist button
        var saveToWatchListBtn = $('<button>');
        saveToWatchListBtn.attr('data-movie', title);
        saveToWatchListBtn.attr('data-id', imdbId);
        saveToWatchListBtn.text('Save to Watchlist ⭐');
        movieDiv.append(saveToWatchListBtn);

        saveToWatchListBtn.on('click', captureFavoriteMovie);
      }
    })
}

$(document).ready(function() {
  $(".dropdown-trigger").click(function() {
    $(".dropdown").toggleClass("is-active");
  });
});
