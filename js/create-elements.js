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

  window.createElement = {
    mapCardHidden: function () {
      var mapCard = map.querySelectorAll('.map__card');
      for (var j = 0; j < window.utils.PIN_NUMBER; j++) {
        mapCard[j].classList.add('hidden');
      }
    }
  };

  var createCards = function () {
    window.createMock.createObjects();
    var fragment = document.createDocumentFragment();
    for (var k = 0; k < window.utils.PIN_NUMBER; k++) {
      fragment.appendChild(createItem(window.createMock.cards[k]));
    }
    map.insertBefore(fragment, filtersContainer);
    window.createElement.mapCardHidden();
  };

  var createPins = function () {
    var fragment = document.createDocumentFragment();
    for (var k = 0; k < window.utils.PIN_NUMBER; k++) {
      fragment.appendChild(createPin(window.createMock.cards[k]));
    }
    similarCardElement.appendChild(fragment);
  };

  createCards();
  createPins();
})();
