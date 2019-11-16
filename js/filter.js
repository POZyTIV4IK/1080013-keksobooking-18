'use strict';

(function () {
  var housingTypeFilter = document.querySelector('select[name="housing-type"]');

  var cards = [];
  var newCards = [];

  var updateRender = function (renderFunction, type) {
    if (type === 'any') {
      newCards = cards;
    } else {
      newCards = cards.filter(function (it) {
        return it.offer.type === type;
      });
    }
    renderFunction(newCards);
  };

  var removePreviousRender = function (className) {
    var element = document.querySelectorAll(className);
    for (var i = 0; i < element.length; i++) {
      element[i].parentNode.removeChild(element[i]);
    }
  };

  housingTypeFilter.addEventListener('change', function (evt) {
    var type = evt.target.value;
    removePreviousRender('.map__card');
    removePreviousRender('.map__pin-advert');
    updateRender(window.createElements.renderAdvertPinsOnMap, type);
    updateRender(window.createElements.renderAdvertCardsOnMap, type);
    window.manipulateMap.activateMapPins();
  });

  var renderFilteredPinsOnMap = function (data) {
    cards = data;
    updateRender(window.createElements.renderAdvertPinsOnMap, 'any');
  };

  var renderFilteredCardsOnMap = function (data) {
    cards = data;
    updateRender(window.createElements.renderAdvertCardsOnMap, 'any');
  };

  var onXhrLoadEnd = function (data) {
    renderFilteredCardsOnMap(data);
    renderFilteredPinsOnMap(data);
  };

  window.backend.load(onXhrLoadEnd, window.utils.onError, window.utils.URL_TO_GET);
})();
