'use strict';

(function () {
  var map = document.querySelector('.map');
  var similarCardElement = map.querySelector('.map__pins');

  var showPinCard = function (item) {
    var mapPin = similarCardElement.querySelectorAll('.map__pin');
    var mapCard = map.querySelectorAll('.map__card');
    for (var i = 0; i < window.utils.PIN_NUMBER; i++) {
      mapCard[i].classList.add('hidden');
      if (item === mapPin[i + 1]) {
        mapCard[i].classList.remove('hidden');
      }
    }
  };

  similarCardElement.addEventListener('click', function (evt) {
    showPinCard(evt.target);
  });

  var closeCard = function () {
    var cardClose = map.querySelectorAll('.popup__close');
    for (var i = 0; i < window.utils.PIN_NUMBER; i++) {
      cardClose[i].addEventListener('click', window.createElement.mapCardHide);
    }
  };

  setTimeout(closeCard, 1000);

  map.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      window.createElement.mapCardHide();
    }
  });

})();
