'use strict';

var renderList = function(list){
  var ul = document.createElement('ul');
  var container = document.getElementById('container');
  container.appendChild(ul);
  list.forEach(function(element){
    var li = document.createElement('li');
    li.innerHTML = element.title;
    ul.appendChild(li);
  });
}

var request = new XMLHttpRequest;
request.open('GET', 'http://watchlist-koa.herokuapp.com/user/529dfc93d6bb28020079268d', true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400){
    var user = JSON.parse(request.responseText);
    renderList(user.lists);
  } else {
    console.log("error");
  }
};

request.send();

