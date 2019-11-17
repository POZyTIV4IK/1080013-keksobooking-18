'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingTypeFilter = mapFilters.querySelector('select[name="housing-type"]');
  var housingPriceFilter = mapFilters.querySelector('select[name="housing-price"]');
  var housingRoomsNumberFilter = mapFilters.querySelector('select[name="housing-rooms"]');
  var housingGuestsNumberFilter = mapFilters.querySelector('select[name="housing-guests"]');
  var featureWifi = document.querySelector('#filter-wifi');
  var featureDishwasher = document.querySelector('#filter-dishwasher');
  var featureParking = document.querySelector('#filter-parking');
  var featureWasher = document.querySelector('#filter-washer');
  var featureElevator = document.querySelector('#filter-elevator');
  var featureConditioner = document.querySelector('#filter-conditioner');

  var cards = [];
  var newCardsbyType = [];
  var newCardsbyPrice = [];
  var newCardsbyRoomsNumber = [];
  var newCardsbyGuestsNumber = [];
  var newCardsbyFeatures = [];

  var updateRenderbyFeatures = function (featuresType) {
    if (featuresType === 'any') {
      newCardsbyFeatures = cards;
    } else {
      newCardsbyFeatures = cards.filter(function (it) {
        var a = it.offer.features;
        console.log(featuresType.includes(a));
        return featuresType.includes(a);
      });
    }
    console.log(newCardsbyFeatures);
    return newCardsbyFeatures;
  };

  var updateRenderbyType = function (housingType) {
    if (housingType === 'any') {
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

  mapFilters.addEventListener('change', function (evt) {
    var featuresType = [];
    if (evt.target.id === 'housing-type') {
      var housingType = evt.target.value;
    } else {
      housingType = housingTypeFilter.value;
    }
    // if (evt.target.name === 'features') {
    //   if (evt.target.checked) {
    //     array += array;
    //     console.log(array);
    //     featuresType = array;
    //   } else {
    //     featuresType = 'any';
    //   }
    // }
    if (featureWifi.checked) {
      featuresType.push(featureWifi.value);
    }
    if (featureDishwasher.checked) {
      featuresType.push(featureDishwasher.value);
    }
    if (featureParking.checked) {
      featuresType.push(featureParking.value);
    }
    if (featureWasher.checked) {
      featuresType.push(featureWasher.value);
    }
    if (featureElevator.checked) {
      featuresType.push(featureElevator.value);
    }
    if (featureConditioner.checked) {
      featuresType.push(featureConditioner.value);
    }

    console.log(featuresType);
    removePreviousRender('.map__card');
    removePreviousRender('.map__pin-advert');
    updateRender(window.createElements.renderAdvertPinsOnMap, housingType, featuresType);
    updateRender(window.createElements.renderAdvertCardsOnMap, housingType, featuresType);
    window.manipulateMap.activateMapPins();
  });

  var renderFilteredPinsOnMap = function (data) {
    cards = data;
    updateRender(window.createElements.renderAdvertPinsOnMap, 'any', 'any');
  };

  var renderFilteredCardsOnMap = function (data) {
    cards = data;
    updateRender(window.createElements.renderAdvertCardsOnMap, 'any', 'any');
  };

  var onXhrLoadEnd = function (data) {
    renderFilteredCardsOnMap(data);
    renderFilteredPinsOnMap(data);
  };

  window.backend.load(onXhrLoadEnd, window.utils.onError, window.utils.URL_TO_GET);
})();
