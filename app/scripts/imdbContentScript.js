'use strict';

var movie = {};
var movieMetadata = document.querySelector('title').innerHTML.match(/^(.+)\s\((\d+)\)/);
movie.title = movieMetadata[1];
movie.year = movieMetadata[2];

var button = document.createElement('input');
button.type = 'button';
button.value = 'Add to watchlist';
button.className = 'watchlist-btn-google';

button.addEventListener('click', function(){
  console.log('adding ' + movie.title + 'year: ' + movie.year + 'to watchlist');
});

var box = document.querySelector('#prometer_container');
box.appendChild(button);
