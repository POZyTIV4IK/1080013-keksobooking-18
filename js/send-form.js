'use strict';

(function () {
  var choiceForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');
  var successAlert = successTemplate.cloneNode(true);

  var successHandler = function () {
    map.classList.add('map--faded');
    choiceForm.reset();
    choiceForm.classList.add('ad-form--disabled');
    window.createElements.hideAdvertElementsOnMap('.map__pin-advert');
    window.createElements.hideAdvertElementsOnMap('.map__card');
    mainPin.style.left = window.utils.DEFAULT_MAIN_PIN_X_ADDRESS;
    mainPin.style.top = window.utils.DEFAULT_MAIN_PIN_Y_ADDRESS;
    window.manipulateMap.defaultAddress();
    map.appendChild(successAlert);
  };

  choiceForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(choiceForm), successHandler, window.utils.onError);
  });

  var hideSuccessAlert = function () {
    if (document.querySelector('.success')) {
      map.removeChild(successAlert);
    }
  };

  document.addEventListener('click', hideSuccessAlert);
  document.addEventListener('keydown', function (evt) {
    if (evt.key === window.utils.ESC_KEYCODE) {
      hideSuccessAlert();
    }
  });
})();
