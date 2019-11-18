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
    if (housingPriceFilter.selectedIndex === 0) {
      newCardsbyPrice = cards;
    } else if (housingPriceFilter.selectedIndex === 1) {
      newCardsbyPrice = cards.filter(function (it) {
        return it.offer.price >= window.utils.LOWEST_PRICE && it.offer.price <= window.utils.HIGHEST_PRICE;
      });
    } else if (housingPriceFilter.selectedIndex === 2) {
      newCardsbyPrice = cards.filter(function (it) {
        return it.offer.price < window.utils.LOWEST_PRICE;
      });
    } else if (housingPriceFilter.selectedIndex === 3) {
      newCardsbyPrice = cards.filter(function (it) {
        return it.offer.price > window.utils.HIGHEST_PRICE;
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
    var newCardsLevel4 = newCardsbyGuestsNumber.filter(function (it) {
      return newCardsbyFeatures.indexOf(it) !== -1;
    });
    var newCardsLevel3 = newCardsbyRoomsNumber.filter(function (it) {
      return newCardsLevel4.indexOf(it) !== -1;
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

  var filterFormChanger = debounce(function (evt) {
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
      } else if (allFeatures[i].checked === false) {
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
