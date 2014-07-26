'use strict';

var renderMovie, fetchWatchlist,
   userId = '53134ae78b42c302008eed55',
   ul = document.createElement('ul'),
   container = document.getElementById('container');

renderMovie = function(movie) {
   var li = document.createElement('li'),
      title = document.createElement('h4'),
      poster = document.createElement('img'),
      link = 'http://watchlist-webapp.herokuapp.com/#/movie/' + movie.id;

   container.appendChild(ul);
   title.innerHTML = movie.title;
   poster.src = 'http://d3gtl9l2a4fn1j.cloudfront.net/t/p/w92/' + movie.poster_path;
   li.appendChild(poster);
   li.appendChild(title);
   li.addEventListener('click', function() {
      chrome.tabs.create({active: true, url: link});
   });
   ul.appendChild(li);
};

fetchWatchlist = function(user) {
   var watchlist = user.lists.filter(function(list) {
      return list.title === 'watchlist';
   })[0];
   watchlist.movies.map(function(movieID) {
      makeRequest('http://watchlist-koa.herokuapp.com/tmdb/3/movie/' + movieID, renderMovie);
   });
};

fetchUser(userId, fetchWatchlist);
