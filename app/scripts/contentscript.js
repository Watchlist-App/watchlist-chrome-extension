'use strict';

var button = document.createElement('input');
button.type = 'button';
button.value = 'Add to watchlist';
button.className = 'wathclist-btn-google';

button.onclick = function(){
  console.log('adding to watchlist');
};

var waitForBox = setInterval(checkForElement, 150);

function checkForElement() {
  var box = document.querySelector('.kno-ecr-pt');
  if (box) {
    clearInterval (waitForBox);
    box.appendChild(button);
  }
}

