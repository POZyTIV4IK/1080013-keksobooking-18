'use strict';

(function () {
  var map = document.querySelector('.map');
  var advertTag = map.querySelector('.map__pins');

  var showPinCard = function (item) {
    var mapAllPins = advertTag.querySelectorAll('.map__pin');
    var mapAdvertCards = map.querySelectorAll('.map__card');
    for (var i = 0; i < window.utils.PIN_NUMBER; i++) {
      mapAdvertCards[i].classList.add('hidden');
      if (item === mapAllPins[i + 1]) {
        mapAdvertCards[i].classList.remove('hidden');
      }
    }
  };

  advertTag.addEventListener('click', function (evt) {
    showPinCard(evt.target);
  });

  var closeCard = function () {
    var onCardsCloseButtonsClick = map.querySelectorAll('.popup__close');
    for (var i = 0; i < window.utils.PIN_NUMBER; i++) {
      onCardsCloseButtonsClick[i].addEventListener('click', window.createElements.hideAdvertCardsOnMap);
    }
  };

  setTimeout(closeCard, 1000);

  map.addEventListener('keydown', function (evt) {
    if (evt.key === window.utils.ESC_KEY) {
      window.createElements.hideAdvertCardsOnMap();
    }
  });

})();
