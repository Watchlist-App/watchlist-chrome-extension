'use strict';

var injectButton, movieTitle, movieYear,
   userId = '53134ae78b42c302008eed55',
   box = document.querySelector('#rhs');

injectButton = function(box) {
   var movieTitleDiv = box.querySelector('.kno-ecr-pt'),
      caption = movieTitleDiv.nextSibling;
   // caption = box.querySelector('._ps') || box.querySelector('._bs');

   if (caption.innerHTML.match(/Film/)) {
      movieTitle = movieTitleDiv.innerHTML;
      movieYear = caption.innerHTML.match(/(\d+)/)[0];

      findMovie(movieTitle, movieYear, function(movie) {
         fetchUser(userId, function(user) {
            var button = createButton(user, movie.id);
            movieTitleDiv.appendChild(button);
         });
      });
   }
};

box && injectButton(box);

document.addEventListener('DOMNodeInserted', function(event) {
   (event.target.id === 'rhs') && injectButton(event.target);
}, false);
