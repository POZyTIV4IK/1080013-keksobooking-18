'use strict';

(function () {
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

  window.createMock = {
    createObjects: function () {
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
    },
    cards: cards
  };
})();
