'use strict';

var renderList = function(list){
  var ul = document.createElement('ul');
  var container = document.getElementById('container');
  container.appendChild(ul);
  list.forEach(function(element){
    var li = document.createElement('li');
    li.innerHTML = element;
    var link = 'http://watchlist-webapp.herokuapp.com/#/movie/' + element;
    li.onclick = function () {
      chrome.tabs.create({active: true, url: link});
    };
    ul.appendChild(li);
  });
}

var request = new XMLHttpRequest;
request.open('GET', 'http://watchlist-koa.herokuapp.com/user/529dfc93d6bb28020079268d', true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400){
    var user = JSON.parse(request.responseText);
    var watchlist = user.lists.filter(function(list){return list.title == "watchlist"})[0];
    renderList(watchlist.movies);
  } else {
    console.log("error");
  }
};

request.send();

