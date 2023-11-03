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