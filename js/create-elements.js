'use strict';

(function () {
  var map = document.querySelector('.map');
  var filtersContainer = map.querySelector('.map__filters-container');
  var similarCardElement = map.querySelector('.map__pins');
  var similarCardTemplate = document.querySelector('#card')
      .content
      .querySelector('.map__card');

  var similarPinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

  var apartmentTypes = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };
  var registrationTimes = ['12:00', '13:00', '14:00'];
  var optionChoices = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var imgLinks = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var cards = [];

  var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var createItem = function (cardStructure) {
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
    var allocate = 'left: ' + (pinStructure.location.x - window.utils.PIN_SIZE / 2) + 'px; ' + 'top: ' + (pinStructure.location.y - window.utils.PIN_SIZE) + 'px;';
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
    for (var i = 0; i < window.utils.PIN_NUMBER; i++) {
      var locationX = getRandomInteger(window.utils.SCREEN_MIN_HEIGHT, window.utils.SCREEN_MAX_HEIGHT);
      var locationY = getRandomInteger(window.utils.SCREEN_MIN_WIDTH, window.utils.SCREEN_MAX_WIDTH);
      card[i] = {
        author: {
          avatar: 'img/avatars/user' + '0' + (i + 1) + '.png'
        },
        offer: {
          title: 'Сдается квартира с хорошим месторасположением',
          address: locationX + ', ' + locationY,
          price: [getRandomInteger(0, window.utils.MAX_PRICE)],
          type: apartmentTypes[generateRandomTypeOfApartment()],
          rooms: [getRandomInteger(0, window.utils.MAX_ROOMS)],
          guests: [getRandomInteger(0, window.utils.MAX_GUESTS)],
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

  var mapCardHidden = function () {
    var mapCard = map.querySelectorAll('.map__card');
    for (var j = 0; j < window.utils.PIN_NUMBER; j++) {
      mapCard[j].classList.add('hidden');
    }
  };

  window.createElement = {
    mapCardHidden: mapCardHidden,
    PIN_NUMBER: window.utils.PIN_NUMBER
  };

  var createCards = function () {
    createObjects();
    var fragment = document.createDocumentFragment();
    for (var k = 0; k < window.utils.PIN_NUMBER; k++) {
      fragment.appendChild(createItem(cards[k]));
    }
    map.insertBefore(fragment, filtersContainer);
    mapCardHidden();
  };

  var createPins = function () {
    var fragment = document.createDocumentFragment();
    for (var k = 0; k < window.utils.PIN_NUMBER; k++) {
      fragment.appendChild(createPin(cards[k]));
    }
    similarCardElement.appendChild(fragment);
  };

  createCards();
  createPins();
})();
