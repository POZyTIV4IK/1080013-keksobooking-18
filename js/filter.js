'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingTypeFilter = mapFilters.querySelector('select[name="housing-type"]');
  var housingPriceFilter = mapFilters.querySelector('select[name="housing-price"]');
  var housingRoomsNumberFilter = mapFilters.querySelector('select[name="housing-rooms"]');
  var housingGuestsNumberFilter = mapFilters.querySelector('select[name="housing-guests"]');
  var allFeatures = mapFilters.querySelectorAll('.map__checkbox');

  var cards = [];
  var newCardsbyType = [];
  var newCardsbyPrice = [];
  var newCardsbyRoomsNumber = [];
  var newCardsbyGuestsNumber = [];
  var newCardsbyFeatures = [];
  var guestsMapping = {
    1: 2,
    2: 1,
    3: 0
  };
  var priceMapping = {
    1: function (type) {
      return type >= window.utils.LOWEST_PRICE && type <= window.utils.HIGHEST_PRICE;
    },
    2: function (type) {
      return type < window.utils.LOWEST_PRICE;
    },
    3: function (type) {
      return type > window.utils.HIGHEST_PRICE;
    }
  };

  var updateRenderbyType = function (housingType) {
    if (housingType === window.utils.NULL_FEATURE) {
      newCardsbyType = cards;
    } else {
      newCardsbyType = cards.filter(function (it) {
        return it.offer.type === housingType;
      });
    }
    return newCardsbyType;
  };

  var updateRenderbyPrice = function () {
    for (var i = 1; i < window.utils.MAX_CHOICES_NUMBER; i++) {
      if (housingPriceFilter.selectedIndex === 0) {
        newCardsbyPrice = cards;
      } else if (housingPriceFilter.selectedIndex === i) {
        newCardsbyPrice = cards.filter(function (it) {
          return priceMapping[i](it.offer.price);
        });
      }
    }
    return newCardsbyPrice;
  };

  var updateRenderbyRoomsNumber = function () {
    for (var i = 1; i < window.utils.MAX_CHOICES_NUMBER; i++) {
      if (housingRoomsNumberFilter.selectedIndex === 0) {
        newCardsbyRoomsNumber = cards;
      } else if (housingRoomsNumberFilter.selectedIndex === i) {
        newCardsbyRoomsNumber = cards.filter(function (it) {
          return it.offer.rooms === i;
        });
      }
    }
    return newCardsbyRoomsNumber;
  };

  var updateRenderbyGuestsNumber = function () {
    for (var i = 1; i < window.utils.MAX_CHOICES_NUMBER; i++) {
      if (housingGuestsNumberFilter.selectedIndex === 0) {
        newCardsbyGuestsNumber = cards;
      } else if (housingGuestsNumberFilter.selectedIndex === i) {
        newCardsbyGuestsNumber = cards.filter(function (it) {
          return it.offer.guests === guestsMapping[housingGuestsNumberFilter.selectedIndex];
        });
      }
    }
    return newCardsbyGuestsNumber;
  };

  var updateRenderbyFeatures = function (featuresType) {
    if (featuresType === window.utils.NULL_FEATURE) {
      newCardsbyFeatures = cards;
    } else {
      var arrayContainsArray = function (firstArray, secondArray) {
        if (secondArray.length === 0) {
          return false;
        }
        return secondArray.every(function (value) {
          return (firstArray.indexOf(value) >= 0);
        });
      };
      newCardsbyFeatures = cards.filter(function (it) {
        return arrayContainsArray(it.offer.features, featuresType);
      });
    }
    return newCardsbyFeatures;
  };

  var updateRender = function (renderFunction, housingType, featuresType) {
    updateRenderbyType(housingType);
    updateRenderbyPrice();
    updateRenderbyRoomsNumber();
    updateRenderbyGuestsNumber();
    updateRenderbyFeatures(featuresType);
    var newCardsFiltered = newCardsbyType.filter(function (it) {
      return newCardsbyPrice.indexOf(it) !== -1 && newCardsbyRoomsNumber.indexOf(it) !== -1
      && newCardsbyGuestsNumber.indexOf(it) !== -1 && newCardsbyFeatures.indexOf(it) !== -1;
    });
    renderFunction(newCardsFiltered);
  };

  var removePreviousRender = function (className) {
    var element = document.querySelectorAll(className);
    for (var i = 0; i < element.length; i++) {
      element[i].parentNode.removeChild(element[i]);
    }
  };

  var filterFormChanger = window.utils.debounce(function (evt) {
    var featuresType = [];
    var featuresCounter = 0;
    if (evt.target.id === 'housing-type') {
      var housingType = evt.target.value;
    } else {
      housingType = housingTypeFilter.value;
    }

    for (var i = 0; i < allFeatures.length; i++) {
      if (allFeatures[i].checked) {
        featuresType.push(allFeatures[i].value);
      } else if (!allFeatures[i].checked) {
        featuresCounter++;
      }
    }

    if (featuresCounter === window.utils.MAX_FEATURES_NUMBER) {
      featuresType = window.utils.NULL_FEATURE;
    }

    removePreviousRender('.map__card');
    removePreviousRender('.map__pin-advert');
    updateRender(window.createElements.renderAdvertPinsOnMap, housingType, featuresType);
    updateRender(window.createElements.renderAdvertCardsOnMap, housingType, featuresType);
    window.manipulateMap.activateMapPins();
  });

  mapFilters.addEventListener('change', function (evt) {
    filterFormChanger(evt);
  });

  var renderFilteredPinsOnMap = function (data) {
    cards = data;
    updateRender(window.createElements.renderAdvertPinsOnMap, window.utils.NULL_FEATURE, window.utils.NULL_FEATURE);
  };

  var renderFilteredCardsOnMap = function (data) {
    cards = data;
    updateRender(window.createElements.renderAdvertCardsOnMap, window.utils.NULL_FEATURE, window.utils.NULL_FEATURE);
  };

  var onXhrLoadEnd = function (data) {
    renderFilteredCardsOnMap(data);
    renderFilteredPinsOnMap(data);
  };

  window.backend.load(onXhrLoadEnd, window.utils.onError, window.utils.URL_TO_GET);
})();
