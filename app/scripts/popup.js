'use strict';

var userId = '53134ae78b42c302008eed55';

var ul = document.createElement('ul');
var container = document.getElementById('container');
container.appendChild(ul);

var renderMovie = function(movie){
  var li = document.createElement('li');
  var title = document.createElement('h4');
  title.innerHTML = movie.title;
  var poster = document.createElement('img');
  var link = 'http://watchlist-webapp.herokuapp.com/#/movie/' + movie.id;
  poster.src = 'http://d3gtl9l2a4fn1j.cloudfront.net/t/p/w92/' + movie.poster_path;
  li.appendChild(poster);
  li.appendChild(title);
  li.addEventListener('click', function () {
    chrome.tabs.create({active: true, url: link});
  });
  ul.appendChild(li);
};

var fetchWatchlist = function(user){
  var watchlist = user.lists.filter(function(list){
    return list.title === 'watchlist';
  })[0];
  watchlist.movies.map(function(movieID){
    makeRequest('http://watchlist-koa.herokuapp.com/tmdb/3/movie/' + movieID, renderMovie);
  });
};

fetchUser(userId, fetchWatchlist);
