'use strict';

var movie = {};

var button = document.createElement('input');
button.type = 'button';
button.value = 'Add to watchlist';
button.className = 'watchlist-btn-google';

button.addEventListener('click', function(){
  console.log('adding ' + movie.title + ' year:' + movie.year + ' to watchlist');
});

document.addEventListener("DOMNodeInserted", function(e) {
  if (e.target.id == "rhs"){
    var movieTitleDiv = e.target.querySelector('.kno-ecr-pt');
    var caption = e.target.querySelector('._ps');
    if (caption.innerHTML.match(/Film/)){
      movie.title = movieTitleDiv.innerHTML;
      movie.year = caption.innerHTML.match(/(\d+)/)[0];
      movieTitleDiv.appendChild(button);
    }
  }
}, false);
