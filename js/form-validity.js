'use strict';

var roomsSelect = window.choiceForm.querySelector('select[name="rooms"]');
var guestsSelect = window.choiceForm.querySelector('select[name="capacity"]');
var apartmentSelect = window.choiceForm.querySelector('select[name="type"]');
var priceInput = window.choiceForm.querySelector('input[name="price"]');
var timeIn = window.choiceForm.querySelector('select[name="timein"]');
var timeOut = window.choiceForm.querySelector('select[name="timeout"]');

var MAX_ROOMS_NUMBER = 100;

var checkGuestsNumberValidity = function () {
  var roomsNumber = parseInt(roomsSelect.value, 10);
  guestsSelect[3].setAttribute('disabled', '');
  for (var i = 0; i < guestsSelect.length; i++) {
    if (parseInt(guestsSelect[i].value, 10) > roomsNumber) {
      guestsSelect[i].setAttribute('disabled', '');
    } else if (roomsNumber === MAX_ROOMS_NUMBER) {
      guestsSelect[i].setAttribute('disabled', '');
      guestsSelect[3].removeAttribute('disabled', '');
    }
  }
};

roomsSelect.addEventListener('change', function (evt) {
  window.activatePageItem(guestsSelect);
  checkGuestsNumberValidity(evt.target);
});

apartmentSelect.addEventListener('change', function (evt) {
  if (evt.target.value === 'bungalo') {
    priceInput.placeholder = '0';
    priceInput.min = '0';
  } else if (evt.target.value === 'flat') {
    priceInput.placeholder = '1000';
    priceInput.min = '1000';
  } else if (evt.target.value === 'house') {
    priceInput.placeholder = '5000';
    priceInput.min = '5000';
  } else if (evt.target.value === 'palace') {
    priceInput.placeholder = '10000';
    priceInput.min = '10000';
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
