var searchBtn = document.getElementById('search-button');
$('.reset-btn-div').css('display', 'none');

function secondFetch(movie){
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

  searchBtn.addEventListener('click', function(){
    $(".main-info-box").css('display', 'none');
    $('.reset-btn-div').css('display', 'flex');
      var searchValue = document.getElementById('search').value;
      secondFetch(searchValue);
  })

  $('#reset-button').on('click', function(){
    location.reload();
  })




// fetch movie of the night
async function apiMovieNightFetch() {
  const urlStart = 'https://streaming-availability.p.rapidapi.com/search/title?title='
  const searchPara = 'The%20Batman'
  const urlEnd = '&country=us&show_type=movie&output_language=en'
  var urlMovieOfTheNight = urlStart + searchPara + urlEnd;
  console.log(urlMovieOfTheNight)
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

    for (let i = 0; i < movies.result.length; i++){
      var streamingService = movies.result[i].streamingInfo.us[i].service;
      var moviePrice = movies.result[i].streamingInfo.us[i].price.amount;
      var typeOfStream = movies.result[i].streamingInfo.us[i].streamingType;
      console.log(streamingService);
      console.log(moviePrice);
      console.log(typeOfStream);
    }
  }

apiMovieNightFetch()