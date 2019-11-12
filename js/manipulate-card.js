'use strict';

(function () {
  var map = document.querySelector('.map');
  var similarCardElement = map.querySelector('.map__pins');

  var showPinCard = function (item) {
    var mapAllPins = similarCardElement.querySelectorAll('.map__pin');
    var mapAdvertCards = map.querySelectorAll('.map__card');
    for (var i = 0; i < window.utils.PIN_NUMBER; i++) {
      mapAdvertCards[i].classList.add('hidden');
      if (item === mapAllPins[i + 1]) {
        mapAdvertCards[i].classList.remove('hidden');
      }
    }
  };

  similarCardElement.addEventListener('click', function (evt) {
    showPinCard(evt.target);
  });

  var closeCard = function () {
    var cardsCloseButtons = map.querySelectorAll('.popup__close');
    for (var i = 0; i < window.utils.PIN_NUMBER; i++) {
      cardsCloseButtons[i].addEventListener('click', window.createElement.hideCardsOnMap);
    }
  };

  setTimeout(closeCard, 1000);

  map.addEventListener('keydown', function (evt) {
    if (evt.key === window.utils.ESC_KEYCODE) {
      window.createElement.hideCardsOnMap();
    }
  });

})();
