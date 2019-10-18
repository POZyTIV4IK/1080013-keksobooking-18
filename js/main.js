'use strict';

var PIN_SIZE = 40;
var PIN_NUMBER = 8;
var SCREEN_MIN_WIDTH = 130;
var SCREEN_MAX_WIDTH = 631;
var SCREEN_MIN_HEIGHT = 1;
var SCREEN_MAX_HEIGHT = 1000;
var userDialog = document.querySelector('.map');
var similarCardElement = userDialog.querySelector('.map__pins');
var filtersContainer = userDialog.querySelector('.map__filters-container');
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
  cardElement.querySelector('.popup__text--capacity').textContent = cardStructure.offer.rooms + ' комнаты для ';
  cardElement.querySelector('.popup__text--capacity').textContent += cardStructure.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardStructure.offer.checkin + ', выезд до ';
  cardElement.querySelector('.popup__text--time').textContent += cardStructure.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = cardStructure.offer.features;
  cardElement.querySelector('.popup__description').textContent = cardStructure.offer.description;
  cardElement.querySelector('.popup__photo').src = cardStructure.offer.photos;
  return cardElement;
};

userDialog.classList.remove('map--faded');

var createPin = function (pinStructure) {
  var cardPin = similarPinTemplate.cloneNode(true);
  var allocate = 'left: ' + (pinStructure.location.x - PIN_SIZE / 2) + 'px; ' + 'top: ' + (pinStructure.location.y - PIN_SIZE) + 'px;';
  cardPin.style = allocate;
  cardPin.querySelector('img').src = pinStructure.author.avatar;
  cardPin.querySelector('img').alt = pinStructure.offer.title;
  return cardPin;
};

var createObjects = function () {
  var card = {};
  var TypeOfApartment = 'flat';
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
        price: [getRandomInteger(0, 3000)],
        type: apartmentTypes[TypeOfApartment],
        rooms: [getRandomInteger(0, 10)],
        guests: [getRandomInteger(0, 4)],
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

var createCard = function () {
  createObjects();
  var fragment1 = document.createDocumentFragment();
  var fragment2 = document.createDocumentFragment();
  for (var k = 0; k < PIN_NUMBER; k++) {
    fragment2.appendChild(createElement(cards[k]));
    fragment1.appendChild(createPin(cards[k]));
  }
  similarCardElement.appendChild(fragment1);
  userDialog.insertBefore(fragment2, filtersContainer);
};

createCard();
