'use strict';

var makeRequest = function(url, cb){
  var request = new XMLHttpRequest;
  request.open('GET', url, true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400){
      var response = JSON.parse(request.responseText);
      cb(response);
    } else {
      console.log("error");
    }
  };

  request.send();
}
