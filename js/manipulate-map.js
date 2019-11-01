'use strict';

(function () {
  var map = document.querySelector('.map');
  var similarCardElement = map.querySelector('.map__pins');
  var choiceForm = document.querySelector('.ad-form');
  var allFieldsets = choiceForm.querySelectorAll('fieldset');
  var addressInput = choiceForm.querySelector('input[name="address"]');
  var mainPin = similarCardElement.querySelector('.map__pin--main');

  var disablePageItem = function (input) {
    for (var i = 0; i < input.length; i++) {
      input[i].setAttribute('disabled', '');
    }
  };

  var activatePageItem = function (input) {
    for (var i = 0; i < input.length; i++) {
      input[i].removeAttribute('disabled');
    }
  };

  window.manipulateMap = {
    activatePageItem: activatePageItem
  };

  disablePageItem(allFieldsets);

  var defaultAddress = function () {
    addressInput.value = parseInt(mainPin.style.left, 10) + ', ' + parseInt(mainPin.style.top, 10);
  };

  defaultAddress();

  var activateMap = function () {
    map.classList.remove('map--faded');
    activatePageItem(allFieldsets);
    addressInput.value = parseInt(mainPin.style.left, 10) + ', ' + (parseInt(mainPin.style.top, 10) - window.utils.ARROW_SIZE);
    choiceForm.classList.remove('ad-form--disabled');
  };

  mainPin.addEventListener('mousedown', activateMap);
  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      activateMap();
    }
  });

})();
