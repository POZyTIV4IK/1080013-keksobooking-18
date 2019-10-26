'use strict';

var PIN_SIZE = 40;
var PIN_NUMBER = 8;
var SCREEN_MIN_WIDTH = 130;
var SCREEN_MAX_WIDTH = 631;
var SCREEN_MIN_HEIGHT = 1;
var SCREEN_MAX_HEIGHT = 1000;
var MAX_PRICE = 3000;
var MAX_ROOMS = 10;
var MAX_GUESTS = 4;
var ENTER_KEYCODE = 13;
var ARROW_SIZE = 20;
var MAX_ROOMS_NUMBER = 100;
var map = document.querySelector('.map');
var choiceForm = document.querySelector('.ad-form');
var allFieldsets = choiceForm.querySelectorAll('fieldset');
var addressInput = choiceForm.querySelector('input[name="address"]');
var roomsSelect = choiceForm.querySelector('select[name="rooms"]');
var guestsSelect = choiceForm.querySelector('select[name="capacity"]');
var similarCardElement = map.querySelector('.map__pins');
var filtersContainer = map.querySelector('.map__filters-container');
var mainPin = similarCardElement.querySelector('.map__pin--main');
var mapFilters = filtersContainer.querySelector('.map__filters');

var similarCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var optionChoices = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var imgLinks = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var apartmentTypes = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'
};
var registrationTimes = ['12:00', '13:00', '14:00'];
var cards = [];

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var createElement = function (cardStructure) {
  var cardElement = similarCardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = cardStructure.author.avatar;
  cardElement.querySelector('.popup__title').textContent = cardStructure.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = cardStructure.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = cardStructure.offer.price + '₽/ночь.';
  cardElement.querySelector('.popup__type').textContent = cardStructure.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = cardStructure.offer.rooms + ' комнаты для ' + cardStructure.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardStructure.offer.checkin + ', выезд до ' + cardStructure.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = cardStructure.offer.features;
  cardElement.querySelector('.popup__description').textContent = cardStructure.offer.description;
  cardElement.querySelector('.popup__photo').src = cardStructure.offer.photos;
  return cardElement;
};

var createPin = function (pinStructure) {
  var cardPin = similarPinTemplate.cloneNode(true);
  var allocate = 'left: ' + (pinStructure.location.x - PIN_SIZE / 2) + 'px; ' + 'top: ' + (pinStructure.location.y - PIN_SIZE) + 'px;';
  cardPin.style = allocate;
  cardPin.querySelector('img').src = pinStructure.author.avatar;
  cardPin.querySelector('img').alt = pinStructure.offer.title;
  return cardPin;
};

var generateRandomTypeOfApartment = function () {
  var randomNumber = getRandomInteger(0, 4);
  if (randomNumber === 0) {
    var typeOfApartment = 'flat';
  } else if (randomNumber === 1) {
    typeOfApartment = 'bungalo';
  } else if (randomNumber === 2) {
    typeOfApartment = 'house';
  } else if (randomNumber === 3) {
    typeOfApartment = 'palace';
  }
  return typeOfApartment;
};

var createObjects = function () {
  var card = {};
  for (var i = 0; i < PIN_NUMBER; i++) {
    var locationX = getRandomInteger(SCREEN_MIN_HEIGHT, SCREEN_MAX_HEIGHT);
    var locationY = getRandomInteger(SCREEN_MIN_WIDTH, SCREEN_MAX_WIDTH);
    card[i] = {
      author: {
        avatar: 'img/avatars/user' + '0' + (i + 1) + '.png'
      },
      offer: {
        title: 'Сдается квартира с хорошим месторасположением',
        address: locationX + ', ' + locationY,
        price: [getRandomInteger(0, MAX_PRICE)],
        type: apartmentTypes[generateRandomTypeOfApartment()],
        rooms: [getRandomInteger(0, MAX_ROOMS)],
        guests: [getRandomInteger(0, MAX_GUESTS)],
        checkin: registrationTimes[getRandomInteger(0, 3)],
        checkout: registrationTimes[getRandomInteger(0, 3)],
        features: optionChoices[getRandomInteger(0, 6)],
        description: 'Хорошая квартира с прекрасным видом',
        photos: imgLinks[getRandomInteger(0, 3)]
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
    cards.push(card[i]);
  }
  return cards;
};

var createCards = function () {
  createObjects();
  var fragment = document.createDocumentFragment();
  for (var k = 0; k < PIN_NUMBER; k++) {
    fragment.appendChild(createElement(cards[k]));
  }
  map.insertBefore(fragment, filtersContainer);
};

var createPins = function () {
  var fragment = document.createDocumentFragment();
  for (var k = 0; k < PIN_NUMBER; k++) {
    fragment.appendChild(createPin(cards[k]));
  }
  similarCardElement.appendChild(fragment);
};

createCards();
createPins();

var disablePage = function (input) {
  for (var i = 0; i < input.length; i++) {
    input[i].disabled = true;
  }
  mapFilters.style.pointerEvents = 'none';
  choiceForm.style.pointerEvents = 'none';
};

var activatePage = function (input) {
  for (var i = 0; i < input.length; i++) {
    input[i].removeAttribute('disabled');
  }
  mapFilters.style.pointerEvents = '';
  choiceForm.style.pointerEvents = '';
};

disablePage(allFieldsets);

var defaultAddress = function () {
  addressInput.value = parseInt(mainPin.style.left, 10) + ', ' + parseInt(mainPin.style.top, 10);
};

defaultAddress();

var activateMap = function () {
  map.classList.remove('map--faded');
  activatePage(allFieldsets);
  addressInput.value = parseInt(mainPin.style.left, 10) + ', ' + (parseInt(mainPin.style.top, 10) - ARROW_SIZE);
  choiceForm.classList.remove('ad-form--disabled');
};

mainPin.addEventListener('mousedown', activateMap);
mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activateMap();
  }
});

var checkGuestsNumberValidity = function (item) {
  var roomsNumber = parseInt(roomsSelect.value, 10);
  for (var i = 0; i < guestsSelect.length; i++) {
    if (parseInt(guestsSelect[i].value, 10) < roomsNumber) {
      guestsSelect[i].setAttribute('disabled', '');
      item.setCustomValidity('Количество гостей больше, чем количество комнат');
    }
    if (roomsNumber === MAX_ROOMS_NUMBER) {
      guestsSelect[3].removeAttribute('disabled', '');
    }
  }
};

roomsSelect.addEventListener('change', function (evt) {
  activatePage(guestsSelect);
  checkGuestsNumberValidity(evt.target);
});
