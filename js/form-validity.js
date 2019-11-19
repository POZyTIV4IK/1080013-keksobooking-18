'use strict';

(function () {
  var choiceForm = document.querySelector('.ad-form');
  var roomsSelect = choiceForm.querySelector('select[name="rooms"]');
  var guestsSelect = choiceForm.querySelector('select[name="capacity"]');
  var apartmentSelect = choiceForm.querySelector('select[name="type"]');
  var priceInput = choiceForm.querySelector('input[name="price"]');
  var timeIn = choiceForm.querySelector('select[name="timein"]');
  var timeOut = choiceForm.querySelector('select[name="timeout"]');


  var disableOnMapActivation = function () {
    guestsSelect[0].setAttribute('disabled', '');
    guestsSelect[1].setAttribute('disabled', '');
    guestsSelect[3].setAttribute('disabled', '');
  };

  disableOnMapActivation();

  var checkGuestsNumberValidity = function () {
    var roomsNumber = parseInt(roomsSelect.value, 10);

    guestsSelect[3].setAttribute('disabled', '');

    for (var i = 0; i < guestsSelect.length; i++) {
      guestsSelect[i].removeAttribute('selected', '');
      if (parseInt(guestsSelect[i].value, 10) > roomsNumber) {
        guestsSelect[i].setAttribute('disabled', '');
        guestsSelect[2].setAttribute('selected', '');
      } else if (roomsSelect.selectedIndex === 3) {
        guestsSelect[i].setAttribute('disabled', '');
        guestsSelect[3].removeAttribute('disabled', '');
        guestsSelect[3].setAttribute('selected', '');
      }
    }
  };

  roomsSelect.addEventListener('change', function (evt) {
    window.manipulateMap.activatePageItem(guestsSelect);
    checkGuestsNumberValidity(evt.target);
  });

  apartmentSelect.addEventListener('change', function (evt) {
    if (evt.target.value === 'bungalo') {
      priceInput.placeholder = window.utils.MIN_BUNGALO_PRICE;
      priceInput.min = window.utils.MIN_BUNGALO_PRICE;
    } else if (evt.target.value === 'flat') {
      priceInput.placeholder = window.utils.MIN_FLAT_PRICE;
      priceInput.min = window.utils.MIN_FLAT_PRICE;
    } else if (evt.target.value === 'house') {
      priceInput.placeholder = window.utils.MIN_HOUSE_PRICE;
      priceInput.min = window.utils.MIN_HOUSE_PRICE;
    } else if (evt.target.value === 'palace') {
      priceInput.placeholder = window.utils.MIN_PALACE_PRICE;
      priceInput.min = window.utils.MIN_PALACE_PRICE;
    }
  });

  var assignTimeValue = function (itemIn, itemOut) {
    for (var i = 0; i < itemIn.length; i++) {
      if (itemIn.selectedIndex === i) {
        itemOut.selectedIndex = i;
      }
    }
  };

  timeIn.addEventListener('change', function (evt) {
    assignTimeValue(evt.target, timeOut);
  });

  timeOut.addEventListener('change', function (evt) {
    assignTimeValue(evt.target, timeIn);
  });

})();
