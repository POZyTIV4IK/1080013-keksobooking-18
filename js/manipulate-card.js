'use strict';

(function () {
  var map = document.querySelector('.map');
  var advertPinsContainer = map.querySelector('.map__pins');

  var onAdvertCardEscPress = function (evt) {
    if (evt.key === window.utils.ESC_KEY) {
      window.createElements.hideAdvertElementsOnMap('.map__card');
    }

    map.removeEventListener('keydown', onAdvertCardEscPress);
  };

  var showPinCard = function (item) {
    var mapAllPins = advertPinsContainer.querySelectorAll('.map__pin');
    var mapAdvertCards = map.querySelectorAll('.map__card');

    mapAdvertCards.forEach(function (mapAdvertCard, i) {
      mapAdvertCard.classList.add('hidden');
      if (item === mapAllPins[i + 1]) {
        mapAdvertCard.classList.remove('hidden');
      }
    });

    map.addEventListener('keydown', onAdvertCardEscPress);
  };

  advertPinsContainer.addEventListener('click', function (evt) {
    showPinCard(evt.target);
  });

  var closeCard = function () {
    var onCardsCloseButtonsClick = map.querySelectorAll('.popup__close');

    onCardsCloseButtonsClick.forEach(function (onCardsCloseButtonClick) {
      onCardsCloseButtonClick.addEventListener('click', function () {
        window.createElements.hideAdvertElementsOnMap('.map__card');
      });
    });
  };

  map.addEventListener('click', function () {
    closeCard();
  });
})();
