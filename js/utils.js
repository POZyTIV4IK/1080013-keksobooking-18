'use strict';

(function () {
  var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  window.utils = {
    PIN_SIZE: 40,
    PIN_NUMBER: 8,
    SCREEN_MIN_WIDTH: 130,
    SCREEN_MAX_WIDTH: 631,
    SCREEN_MIN_HEIGHT: 1,
    SCREEN_MAX_HEIGHT: 1000,
    MAX_PRICE: 3000,
    MAX_ROOMS: 10,
    MAX_GUESTS: 4,
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    ARROW_SIZE: 20,
    MAX_ROOMS_NUMBER: 100,
    getRandomInteger: getRandomInteger
  };
})();
