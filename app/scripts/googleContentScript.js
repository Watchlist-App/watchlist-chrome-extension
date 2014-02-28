'use strict';

var button = document.createElement('input');
button.type = 'button';
button.value = 'Add to watchlist';
button.className = 'watchlist-btn-google';

button.addEventListener('click', function(){
  console.log('adding to watchlist');
});

document.addEventListener("DOMNodeInserted", function(e) {
  if (e.target.id == "rhs"){
    var movieTitleDiv = e.target.querySelector('.kno-ecr-pt');
    var caption = e.target.querySelector('._ps');
    if (caption.innerHTML.match(/Film/)){
      movieTitleDiv.appendChild(button);
      movie.title = movieTitleDiv.innerHTML;
    }
  }
}, false);
