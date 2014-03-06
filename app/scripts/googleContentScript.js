'use strict';

var userId = '53134ae78b42c302008eed55';

var injectButton = function(box){
  var movieTitleDiv = box.querySelector('.kno-ecr-pt');
  var caption = movieTitleDiv.nextSibling;
  // var caption = box.querySelector('._ps') || box.querySelector('._bs');
  if (caption.innerHTML.match(/Film/)){
    var movieTitle = movieTitleDiv.innerHTML;
    var movieYear = caption.innerHTML.match(/(\d+)/)[0];
    findMovie(movieTitle, movieYear, function(movie){
      fetchUser(userId, function(user){
        var button = createButton(user, movie.id);
        movieTitleDiv.appendChild(button);
      });
    });
  }
};

var box = document.querySelector('#rhs');
if (box){
  injectButton(box);
}

document.addEventListener('DOMNodeInserted', function(event) {
  if (event.target.id === 'rhs'){
    injectButton(event.target);
  }
}, false);
