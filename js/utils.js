'use strict';

(function () {
  var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
  var map = document.querySelector('.map');
  var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  var onError = function () {
    var errorAlert = errorTemplate.cloneNode(true);
    map.appendChild(errorAlert);
  };
  var clientWidth = map.clientWidth;
  window.utils = {
    SUCCESS_STATUS: 200,
    TIMEOUT: 10000,
    PIN_SIZE: 40,
    PIN_NUMBER: 8,
    SCREEN_MIN_WIDTH: 1,
    SCREEN_MIN_HEIGHT: 130,
    SCREEN_MAX_HEIGHT: 630,
    MAX_PRICE: 3000,
    MAX_ROOMS: 10,
    MAX_GUESTS: 4,
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    MAX_ROOMS_NUMBER: 100,
    getRandomInteger: getRandomInteger,
    clientWidth: clientWidth,
    onError: onError
  };
})();
