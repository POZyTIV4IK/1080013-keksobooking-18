'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingTypeFilter = document.querySelector('select[name="housing-type"]');
  var housingPriceFilter = document.querySelector('select[name="housing-price"]');
  var housingRoomsNumberFilter = document.querySelector('select[name="housing-rooms"]');
  var housingGuestsNumberFilter = document.querySelector('select[name="housing-guests"]');
  var housingFeaturesFilter = document.querySelector('select[name="housing-features"]');

  var cards = [];
  var newCardsbyType = [];
  var newCardsbyPrice = [];
  var newCardsbyRoomsNumber = [];
  var newCardsbyGuestsNumber = [];

  var updateRenderbyType = function (type) {
    if (type === 'any') {
      newCardsbyType = cards;
    } else {
      newCardsbyType = cards.filter(function (it) {
        return it.offer.type === type;
      });
    }
    return newCardsbyType;
  };

  var updateRenderbyPrice = function () {
    if (housingPriceFilter.selectedIndex === 0) {
      newCardsbyPrice = cards;
    } else if (housingPriceFilter.selectedIndex === 1) {
      newCardsbyPrice = cards.filter(function (it) {
        return it.offer.price >= 10000 && it.offer.price <= 50000;
      });
    } else if (housingPriceFilter.selectedIndex === 2) {
      newCardsbyPrice = cards.filter(function (it) {
        return it.offer.price < 10000;
      });
    } else if (housingPriceFilter.selectedIndex === 3) {
      newCardsbyPrice = cards.filter(function (it) {
        return it.offer.price > 50000;
      });
    }
    return newCardsbyPrice;
  };

  var updateRenderbyRoomsNumber = function () {
    if (housingRoomsNumberFilter.selectedIndex === 0) {
      newCardsbyRoomsNumber = cards;
    } else if (housingRoomsNumberFilter.selectedIndex === 1) {
      newCardsbyRoomsNumber = cards.filter(function (it) {
        return it.offer.rooms === 1;
      });
    } else if (housingRoomsNumberFilter.selectedIndex === 2) {
      newCardsbyRoomsNumber = cards.filter(function (it) {
        return it.offer.rooms === 2;
      });
    } else if (housingRoomsNumberFilter.selectedIndex === 3) {
      newCardsbyRoomsNumber = cards.filter(function (it) {
        return it.offer.rooms === 3;
      });
    }
    return newCardsbyRoomsNumber;
  };

  var updateRenderbyGuestsNumber = function () {
    if (housingGuestsNumberFilter.selectedIndex === 0) {
      newCardsbyGuestsNumber = cards;
    } else if (housingGuestsNumberFilter.selectedIndex === 1) {
      newCardsbyGuestsNumber = cards.filter(function (it) {
        return it.offer.guests === 2;
      });
    } else if (housingGuestsNumberFilter.selectedIndex === 2) {
      newCardsbyGuestsNumber = cards.filter(function (it) {
        return it.offer.guests === 1;
      });
    } else if (housingGuestsNumberFilter.selectedIndex === 3) {
      newCardsbyGuestsNumber = cards.filter(function (it) {
        return it.offer.guests === 0;
      });
    }
    return newCardsbyGuestsNumber;
  };

  var updateRender = function (renderFunction, type) {
    updateRenderbyType(type);
    updateRenderbyPrice();
    updateRenderbyRoomsNumber();
    updateRenderbyGuestsNumber();
    var newCardsLevel3 = newCardsbyRoomsNumber.filter(function (it) {
      return newCardsbyGuestsNumber.indexOf(it) !== -1;
    });
    var newCardsLevel2 = newCardsbyPrice.filter(function (it) {
      return newCardsLevel3.indexOf(it) !== -1;
    });
    var newCardsLevel1 = newCardsbyType.filter(function (it) {
      return newCardsLevel2.indexOf(it) !== -1;
    });
    renderFunction(newCardsLevel1);
  };

  var removePreviousRender = function (className) {
    var element = document.querySelectorAll(className);
    for (var i = 0; i < element.length; i++) {
      element[i].parentNode.removeChild(element[i]);
    }
  };

  mapFilters.addEventListener('change', function (evt) {
    if (evt.target.id === 'housing-type') {
      var type = evt.target.value;
    } else {
      type = housingTypeFilter.value;
    }
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
