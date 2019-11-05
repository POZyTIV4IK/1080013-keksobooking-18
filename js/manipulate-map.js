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

  disablePageItem(allFieldsets);

  var defaultAddress = function () {
    addressInput.value = parseInt(mainPin.style.left, 10) + window.utils.ARROW_WIDTH + ', ' + parseInt(mainPin.style.top, 10);
  };

  defaultAddress();

  var activateMap = function () {
    map.classList.remove('map--faded');
    activatePageItem(allFieldsets);
    choiceForm.classList.remove('ad-form--disabled');
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    activateMap();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var leftRestriction = -window.utils.ARROW_WIDTH;
      var rightRestriction = map.clientWidth + leftRestriction;

      if ((mainPin.offsetLeft - shift.x) <= rightRestriction && (mainPin.offsetLeft - shift.x) >= leftRestriction) {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }
      if ((mainPin.offsetTop - shift.y) >= window.utils.SCREEN_MIN_HEIGHT && (mainPin.offsetTop - shift.y) <= window.utils.SCREEN_MAX_HEIGHT) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }
      addressInput.value = parseInt(mainPin.style.left, 10) + window.utils.ARROW_WIDTH + ', ' + parseInt(mainPin.style.top, 10);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      activateMap();
    }
  });

  window.manipulateMap = {
    activatePageItem: activatePageItem
  };

})();
