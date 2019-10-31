'use strict';

var choiceForm = document.querySelector('.ad-form');
window.choiceForm = choiceForm;
var allFieldsets = choiceForm.querySelectorAll('fieldset');
var addressInput = choiceForm.querySelector('input[name="address"]');
var mainPin = window.similarCardElement.querySelector('.map__pin--main');

var ARROW_SIZE = 20;
var ENTER_KEYCODE = 13;

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

window.activatePageItem = activatePageItem;

disablePageItem(allFieldsets);

var defaultAddress = function () {
  addressInput.value = parseInt(mainPin.style.left, 10) + ', ' + parseInt(mainPin.style.top, 10);
};

defaultAddress();

var activateMap = function () {
  window.map.classList.remove('map--faded');
  activatePageItem(allFieldsets);
  addressInput.value = parseInt(mainPin.style.left, 10) + ', ' + (parseInt(mainPin.style.top, 10) - ARROW_SIZE);
  choiceForm.classList.remove('ad-form--disabled');
};

mainPin.addEventListener('mousedown', activateMap);
mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activateMap();
  }
});
