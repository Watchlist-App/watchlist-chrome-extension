'use strict';

var button = document.createElement('input');
button.type = 'button';
button.value = 'Add to watchlist';
button.className = 'watchlist-btn-google';

button.addEventListener('click', function(){
  console.log('adding to watchlist');
});

var box = document.querySelector('#prometer_container');
box.appendChild(button);
