'use strict';

var renderMovie, fetchWatchlist, createElement, movieItems, dragSrcEl,
   handleDragStart, handleDragEnter, handleDragOver, handleDragLeave, handleDrop, handleDragEnd,
   userId = '53134ae78b42c302008eed55',
   ul = document.createElement('ul'),
   container = document.getElementById('container');
createElement = function(tag) {
   var element;
   return element = document.createElement(tag)
}
renderMovie = function(movie) {
   var li = createElement('li'),
      title = createElement('span'),
      poster = createElement('img'),
      close = createElement('img'),
      link = 'http://watchlist-webapp.herokuapp.com/#/movie/' + movie.id,
      year = createElement('b');

   li.setAttribute('draggable', true);
   li.classList.add('movie-item');
   year.innerHTML = '(2012)';
   close.src = 'images/close.svg';
   close.classList.add('btn-svg');
   poster.classList.add('movie');
   container.appendChild(ul);
   title.innerHTML = movie.title;
   poster.src = 'http://d3gtl9l2a4fn1j.cloudfront.net/t/p/w92/' + movie.poster_path;
   li.appendChild(poster);
   li.appendChild(title);
   li.appendChild(year);
   li.appendChild(close);
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

 movieItems = document.getElementsByClassName('movie-item');

setTimeout(function() {

   function handleDragStart(e) {
      this.classList.add('start');
      dragSrcEl = this;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.innerHTML);
   };

   function handleDragOver(e) {
        if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }
      e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
   };

   function handleDragEnter(e) {
      this.classList.add('over');
   };

   function handleDragLeave(e) {
      this.classList.remove('over');
   };

   function handleDrop(e) {
   if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
   };
   if (dragSrcEl != this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
   }

   return false;
   };

   function handleDragEnd(e) {
      for (var i = 0, len = movieItems.length; i < len; i++){
         movieItems[i].classList.remove('over');
      }
      this.classList.remove('start');
   };

   for (var i = 0, len = movieItems.length; i < len; i++){
      movieItems[i].addEventListener('dragstart', handleDragStart, false);
      movieItems[i].addEventListener('dragenter', handleDragEnter, false)
      movieItems[i].addEventListener('dragover', handleDragOver, false);
      movieItems[i].addEventListener('dragleave', handleDragLeave, false);
      movieItems[i].addEventListener('drop', handleDrop, false);
      movieItems[i].addEventListener('dragend', handleDragEnd, false);
   }
}, 6000);



