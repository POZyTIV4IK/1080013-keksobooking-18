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

  var onErrorAlertHide = function () {
    if (document.querySelector('.error')) {
      map.removeChild(errorAlert);
    }
  };

  var debounce = function (fun) {
    var lastTimeout = null;
    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fun.apply(null, args);
      }, window.utils.DEBOUNCE_INTERVAL);
    };
  };

  document.addEventListener('click', onErrorAlertHide);
  document.addEventListener('keydown', function (evt) {
    if (evt.key === window.utils.ESC_KEYCODE) {
      onErrorAlertHide();
    }
  });

  window.utils = {
    DEBOUNCE_INTERVAL: 500,
    DEFAULT_MAIN_PIN_X_ADDRESS: '570px',
    DEFAULT_MAIN_PIN_Y_ADDRESS: '375px',
    ENTER_KEY: 'Enter',
    ESC_KEY: 'Escape',
    HIGHEST_PRICE: 50000,
    LOWEST_PRICE: 10000,
    MAX_CHOICES_NUMBER: 4,
    MAX_FEATURES_NUMBER: 6,
    MAX_GUESTS: 4,
    MAX_PIN_NUMBER: 5,
    MAX_PRICE: 3000,
    MAX_ROOMS: 10,
    MAX_ROOMS_NUMBER: 100,
    MIN_BUNGALO_PRICE: '0',
    MIN_FLAT_PRICE: '1000',
    MIN_HOUSE_PRICE: '5000',
    MIN_PALACE_PRICE: '10000',
    NULL_FEATURE: 'any',
    PIN_SIZE: 40,
    SCREEN_MAX_HEIGHT: 630,
    SCREEN_MIN_HEIGHT: 130,
    SCREEN_MIN_WIDTH: 1,
    URL_TO_GET: 'https://js.dump.academy/keksobooking/data',
    URL_TO_POST: 'https://js.dump.academy/keksobooking',
    clientWidth: clientWidth,
    debounce: debounce,
    getRandomInteger: getRandomInteger,
    onError: onError
  };
})();
