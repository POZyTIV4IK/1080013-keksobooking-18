'use strict';

(function () {
  var choiceForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var mapFilters = document.querySelector('.map__filters');
  var clearButton = document.querySelector('.ad-form__reset');
  var successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');
  var successAlert = successTemplate.cloneNode(true);

  var resetPageToDeafult = function () {
    map.classList.add('map--faded');
    choiceForm.reset();
    mapFilters.reset();
    window.filter.updateRender(window.createElements.renderAdvertPinsOnMap, window.utils.NULL_FEATURE, window.utils.NULL_FEATURE);
    choiceForm.classList.add('ad-form--disabled');
    window.createElements.hideAdvertElementsOnMap('.map__pin-advert');
    window.createElements.hideAdvertElementsOnMap('.map__card');
    mainPin.style.left = window.utils.DEFAULT_MAIN_PIN_X_ADDRESS;
    mainPin.style.top = window.utils.DEFAULT_MAIN_PIN_Y_ADDRESS;
    window.manipulateMap.setMainPinToDefaultAddress();
  };

  clearButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetPageToDeafult();
  });

  var successHandler = function () {
    resetPageToDeafult();
    map.appendChild(successAlert);
  };

  choiceForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(choiceForm), successHandler, window.utils.onError, window.utils.URL_TO_POST);
  });

  var onContentClick = function () {
    if (document.querySelector('.success')) {
      map.removeChild(successAlert);
    }
  };

  document.addEventListener('click', onContentClick);
  document.addEventListener('keydown', function (evt) {
    if (evt.key === window.utils.ESC_KEYCODE) {
      onContentClick();
    }
  });
})();
