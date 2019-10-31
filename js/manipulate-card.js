'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var showPinCard = function (item) {
    var mapPin = window.similarCardElement.querySelectorAll('.map__pin');
    var mapCard = window.map.querySelectorAll('.map__card');
    for (var i = 0; i < window.PIN_NUMBER; i++) {
      mapCard[i].classList.add('hidden');
      if (item === mapPin[i + 1]) {
        mapCard[i].classList.remove('hidden');
      }
    }
  };

  window.similarCardElement.addEventListener('click', function (evt) {
    showPinCard(evt.target);
  });

  var closeCard = function () {
    var cardClose = window.map.querySelectorAll('.popup__close');
    for (var i = 0; i < window.PIN_NUMBER; i++) {
      cardClose[i].addEventListener('click', window.mapCardHidden);
    }
  };

  closeCard();

  window.map.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.mapCardHidden();
    }
  });

})();
