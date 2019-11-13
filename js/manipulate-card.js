'use strict';

(function () {
  var map = document.querySelector('.map');
  var advertPinsContainer = map.querySelector('.map__pins');

  var showPinCard = function (item) {
    var mapAllPins = advertPinsContainer.querySelectorAll('.map__pin');
    var mapAdvertCards = map.querySelectorAll('.map__card');

    for (var i = 0; i < window.utils.PIN_NUMBER; i++) {
      mapAdvertCards[i].classList.add('hidden');
      if (item === mapAllPins[i + 1]) {
        mapAdvertCards[i].classList.remove('hidden');
      }
    }
  };

  advertPinsContainer.addEventListener('click', function (evt) {
    showPinCard(evt.target);
  });

  var closeCard = function () {
    var onCardsCloseButtonsClick = map.querySelectorAll('.popup__close');

    for (var i = 0; i < window.utils.PIN_NUMBER; i++) {
      onCardsCloseButtonsClick[i].addEventListener('click', function () {
        window.createElements.hideAdvertElementsOnMap('.map__card');
      });
    }
  };

  setTimeout(closeCard, 1000);

  map.addEventListener('keydown', function (evt) {
    if (evt.key === window.utils.ESC_KEY) {
      window.createElements.hideAdvertElementsOnMap('.map__card');
    }
  });

})();
