'use strict';

(function () {
  var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  window.utils = {
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
    ARROW_WIDTH: 33,
    MAX_ROOMS_NUMBER: 100,
    getRandomInteger: getRandomInteger
  };
})();
