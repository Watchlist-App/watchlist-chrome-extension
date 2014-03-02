'use strict';

var makeRequest = function(url, cb){
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400){
      var response = JSON.parse(request.responseText);
      cb(response);
    } else {
      console.log('error');
    }
  };
  request.send();
};

var addMovieToWatchlist = function(userId, movieId, cb){
  var url = 'http://watchlist-app-server.herokuapp.com/list/addMovie?listTitle=watchlist&userId=' + userId + '&movieId=' + movieId;
  makeRequest(url, function(response){
    cb(response);
  });
};

var findMovie = function(title, year, cb){
  var url = 'http://watchlist-koa.herokuapp.com/tmdb/3/search/movie?query='+ title + '&year=' + year;
  makeRequest(url, function(response){
    cb(response.results[0]);
  });
};

var fetchUser = function(userId, cb){
  var url = 'http://watchlist-koa.herokuapp.com/user/' + userId;
  makeRequest(url, function(response){
    cb(response);
  });
};

var createButton = function(user, movieId){
  var button = document.createElement('input');
  button.type = 'button';
  var watchlist = user.lists.filter(function(list){
    return list.title === 'watchlist';
  })[0].movies;
  button.value = watchlist.indexOf(movieId) === -1 ? 'Add to watchlist' : 'In watchlist';
  button.className = 'watchlist-btn-google';
  button.addEventListener('click', function(){
    addMovieToWatchlist(user._id, movieId, function(response){
      button.value = 'in watchlist';
    });
  });
  return button;
};

