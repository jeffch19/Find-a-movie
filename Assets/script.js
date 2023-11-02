var searchBtn = document.getElementById('search-button')

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
      console.log(data.Search.length);
      for (i = 0; i < data.Search.length; i++){
      var title = data.Search[i].Title;
      var poster = data.Search[i].Poster;
      var year = data.Search[i].Year;
    // //creates poster
    var imgEl = $('<img>');

    imgEl.attr('src', poster);

    $('body').append(imgEl);

    // //creates title
    var titleEl = $('<h2>');

    titleEl.text(title)
     
    $('body').append(titleEl);

    // //creates description
    var yearEl = $('<p>');

    yearEl.text(year)
         
    $('body').append(yearEl);
      }
    })

  };

  searchBtn.addEventListener('click', function(){
      var searchValue = document.getElementById('search').value;
      secondFetch(searchValue);
  })