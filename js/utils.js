'use strict';

(function () {
  var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
  var map = document.querySelector('.map');
  var clientWidth = map.clientWidth;
  var errorAlert = errorTemplate.cloneNode(true);

  var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var onError = function () {
    map.appendChild(errorAlert);
  };

  var hideErrorAlert = function () {
    if (document.querySelector('.error')) {
      map.removeChild(errorAlert);
    }
  };

  document.addEventListener('click', hideErrorAlert);
  document.addEventListener('keydown', function (evt) {
    if (evt.key === window.utils.ESC_KEYCODE) {
      hideErrorAlert();
    }
  });

  window.utils = {
    URL_TO_POST: 'https://js.dump.academy/keksobooking',
    URL_TO_GET: 'https://js.dump.academy/keksobooking/data',
    PIN_SIZE: 40,
    MAX_PIN_NUMBER: 5,
    SCREEN_MIN_WIDTH: 1,
    SCREEN_MIN_HEIGHT: 130,
    SCREEN_MAX_HEIGHT: 630,
    MAX_PRICE: 3000,
    MAX_ROOMS: 10,
    MAX_GUESTS: 4,
    ESC_KEY: 'Escape',
    ENTER_KEY: 'Enter',
    MAX_ROOMS_NUMBER: 100,
    DEFAULT_MAIN_PIN_X_ADDRESS: '570px',
    DEFAULT_MAIN_PIN_Y_ADDRESS: '375px',
    getRandomInteger: getRandomInteger,
    clientWidth: clientWidth,
    onError: onError
  };
})();
