'use strict';

var movie = {};
var userId = '529ed16dc7e98b020066f901';

var createButton = function(){
  var button = document.createElement('input');
  button.type = 'button';
  button.value = 'Add to watchlist';
  button.className = 'watchlist-btn-google';
  button.addEventListener('click', function(){
    addMovieToWatchlist(userId, movie.id, function(response){
      console.log(movie.id);
      button.value = 'in watchlist';
      console.log(response);
    });
  });
  return button;
};

document.addEventListener('DOMNodeInserted', function(e) {
  if (e.target.id === 'rhs'){
    var movieTitleDiv = e.target.querySelector('.kno-ecr-pt');
    var caption = e.target.querySelector('._ps');
    if (caption.innerHTML.match(/Film/)){
      movie.title = movieTitleDiv.innerHTML;
      movie.year = caption.innerHTML.match(/(\d+)/)[0];
      findMovie(movie.title, movie.year, function(response){
        movie.id = response.id;
        var button = createButton();
        movieTitleDiv.appendChild(button);
      });
    }
  }
}, false);
