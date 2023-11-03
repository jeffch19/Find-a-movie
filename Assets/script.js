var searchBtn = document.getElementById('search-button');
$('.reset-btn-div').css('display', 'none');

// second fetch OMBD
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

//   first fetch movie of the night


async function firstFetch (movie) {
    const url = 'https://streaming-availability.p.rapidapi.com/search/title?title=Friends&country=us&show_type=movie&output_language=en&';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2f43227628msh7e02f532e1891e0p188cd9jsndd7637ba78ac',
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
            };
    try {
        const response = await fetch(url, options);
        const movies = await response.json();
        console.log(movies.result);
    } catch (error) {
        console.error(error);
    }
}



firstFetch()


