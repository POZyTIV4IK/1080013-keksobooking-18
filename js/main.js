'use strict';

var userDialog = document.querySelector('.map');

userDialog.classList.remove('map--faded');
var similarCardElement = userDialog.querySelector('.map__pins');
var similarCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var a = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var b = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var c = ['palace', 'flat', 'house', 'bungalo'];
var d = ['12:00', '13:00', '14:00'];


var cards = [];

var createElement = function (cardId) {
  var cardElement = similarCardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = cardId.author.avatar;
  cardElement.querySelector('.popup__title').textContent = cardId.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = cardId.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = cardId.offer.price;
  cardElement.querySelector('.popup__type').textContent = cardId.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = cardId.offer.rooms;
  cardElement.querySelector('.popup__text--capacity').textContent += cardId.offer.guests;
  cardElement.querySelector('.popup__text--time').textContent = cardId.offer.checkin;
  cardElement.querySelector('.popup__text--time').textContent += cardId.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = cardId.offer.features;
  cardElement.querySelector('.popup__description').textContent = cardId.offer.description;
  cardElement.querySelector('.popup__photo').src = cardId.offer.photos;
  return cardElement;
};

var createPin = function (cardNumber) {
  var cardPin = similarPinTemplate.cloneNode(true);
  var allocate = 'left: ' + cardNumber.location.x + 'px; ' + 'top: ' + cardNumber.location.y + 'px;';
  cardPin.style = allocate;
  cardPin.querySelector('img').src = cardNumber.author.avatar;
  cardPin.querySelector('img').alt = cardNumber.offer.title;
  return cardPin;
};

var createObjects = function () {
  var card = {};
  for (var i = 0; i < 8; i++) {
    card[i] = {
      author: {
        avatar: 'img/avatars/user' + '0' + getRandomInteger(1, 9) + '.png'
      },
      offer: {
        title: 'Это заголовок',
        address: '600, 350',
        price: 100,
        type: c[getRandomInteger(0, 4)],
        rooms: 20 + ' комнат ',
        guests: 4 + ' гостя',
        checkin: d[getRandomInteger(0, 3)] + ' въезд ',
        checkout: d[getRandomInteger(0, 3)] + ' выезд',
        features: a[getRandomInteger(0, 6)],
        description: 'Это опиание',
        photos: b[getRandomInteger(0, 3)]
      },
      location: {
        x: getRandomInteger(1, 1000),
        y: getRandomInteger(130, 631)
      }
    };
    cards.push(card[i]);
  }
  return cards;
};

var createCard = function () {
  createObjects();
  var fragment = document.createDocumentFragment();
  for (var k = 0; k < 8; k++) {
    fragment.appendChild(createPin(cards[k]));
  }
  similarCardElement.appendChild(fragment);
};

createCard();
