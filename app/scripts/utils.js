'use strict';

var makeRequest, addMovieToWatchlist, findMovie, fetchUser, createButton, urlAddMovie,
   URL_ADD_MOVIE = 'http://watchlist-app-server.herokuapp.com/list/addMovie?listTitle=watchlist&userId=',
   URL_FIND_MOVIE = 'http://watchlist-koa.herokuapp.com/tmdb/3/search/movie?query=',
   URL_FETCH_USER = 'http://watchlist-koa.herokuapp.com/user/';

makeRequest = function(url, cb) {
   var response,
   request = new XMLHttpRequest();
   request.open('GET', url, true);
   request.onload = function() {
      if (!request.status >= 400) {
         response = JSON.parse(request.responseText);
         cb(response);
      } else {
         console.log('error');
      }
   };
   request.send();
};

addMovieToWatchlist = function(userId, movieId, cb) {
   var url = URL_ADD_MOVIE + userId + '&movieId=' + movieId;
   makeRequest(url, function(response) {
      cb(response);
   });
};

findMovie = function(title, year, cb) {
   var url = URL_FIND_MOVIE + title + '&year=' + year;
   makeRequest(url, function(response) {
      cb(response.results[0]);
   });
};

fetchUser = function(userId, cb) {
   var url = URL_FETCH_USER + userId;
   makeRequest(url, function(response) {
      cb(response);
   });
};

createButton = function(user, movieId) {
   var watchlist,
      button = document.createElement('input');

   button.type = 'button';
   watchlist = user.lists.filter(function(list) {
      return list.title === 'watchlist';
   })[0].movies;

   button.value = watchlist.indexOf(movieId) === -1 ? 'Add to watchlist' : 'In watchlist';
   button.className = 'watchlist-btn-google';
   button.addEventListener('click', function() {
      addMovieToWatchlist(user._id, movieId, function(response) {
         button.value = 'in watchlist';
      });
   });
   return button;
};
