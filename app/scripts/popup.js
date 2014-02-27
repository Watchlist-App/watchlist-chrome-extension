'use strict';

var ul = document.createElement('ul');
var container = document.getElementById('container-watchlist');
container.appendChild(ul);

var fetchWatchlist = function(response){
  var watchlist = response.lists.filter(function(list){return list.title == "watchlist"})[0];
  watchlist.movies.map(function(movieID){
    makeRequest('http://watchlist-koa.herokuapp.com/tmdb/3/movie/' + movieID, renderMovie);
  });
}

var renderMovie = function(movie){
  var li = document.createElement('li');
  var title = document.createElement('h4');
  title.innerHTML = movie.title;
  var poster = document.createElement('img');
  var link = 'http://watchlist-webapp.herokuapp.com/#/movie/' + movie.id;
  poster.src = 'http://d3gtl9l2a4fn1j.cloudfront.net/t/p/w92/' + movie.poster_path;
  li.appendChild(poster);
  li.appendChild(title);
  li.onclick = function () {
    chrome.tabs.create({active: true, url: link});
  };
  ul.appendChild(li);
}

makeRequest('http://watchlist-koa.herokuapp.com/user/529dfc93d6bb28020079268d', fetchWatchlist);
