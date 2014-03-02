'use strict';

var userId = '53134ae78b42c302008eed55';

var box = document.querySelector('#prometer_container');
var movieMetadata = document.querySelector('title').innerHTML.match(/^(.+)\s\((\d+)\)/);
var movieTitle = movieMetadata[1];
var movieYear = movieMetadata[2];

findMovie(movieTitle, movieYear, function(movie){
  fetchUser(userId, function(user){
    var button = createButton(user, movie.id);
    box.appendChild(button);
  });
});
