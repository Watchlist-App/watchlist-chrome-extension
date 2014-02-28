'use strict';

var button = document.createElement('input');
button.type = 'button';
button.value = 'Add to watchlist';
button.className = 'watchlist-btn-google';

button.addEventListener('click', function(){
  console.log('adding to watchlist');
});

document.addEventListener("DOMNodeInserted", function(e) {
  var box = document.querySelector('.kno-ecr-pt');
  var caption = document.querySelector('._ps');
  if (box && caption) {
    if (caption.innerHTML.match(/Film/)){
        box.appendChild(button);
    }
  }
}, false);
