'use strict';

var PIN_SIZE = 40;
var userDialog = document.querySelector('.map');
var similarCardElement = userDialog.querySelector('.map__pins');
var similarCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var optionChoices = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var imgLinks = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var apartmentTypes = ['palace', 'flat', 'house', 'bungalo'];
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
  cardElement.querySelector('.popup__text--price').textContent = cardStructure.offer.price;
  cardElement.querySelector('.popup__type').textContent = cardStructure.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = cardStructure.offer.rooms;
  cardElement.querySelector('.popup__text--capacity').textContent += cardStructure.offer.guests;
  cardElement.querySelector('.popup__text--time').textContent = cardStructure.offer.checkin;
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
  for (var i = 0; i < 8; i++) {
    card[i] = {
      author: {
        avatar: 'img/avatars/user' + '0' + (i + 1) + '.png'
      },
      offer: {
        title: 'Это ',
        address: '{{location.x}}, {{location.y}}',
        price: [getRandomInteger(0, 3000)],
        type: apartmentTypes[getRandomInteger(0, 4)],
        rooms: [getRandomInteger(0, 300)],
        guests: [getRandomInteger(0, 4)],
        checkin: registrationTimes[getRandomInteger(0, 3)] + ' въезд ',
        checkout: registrationTimes[getRandomInteger(0, 3)] + ' выезд',
        features: optionChoices[getRandomInteger(0, 6)],
        description: 'Это описание',
        photos: imgLinks[getRandomInteger(0, 3)]
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
    createElement(cards[k]);
    fragment.appendChild(createPin(cards[k]));
  }
  similarCardElement.appendChild(fragment);
};

createCard();
