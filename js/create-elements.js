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
    for (var i = 0; i < cardStructure.offer.photos.length; i++) {
      var fragment = document.createDocumentFragment();
      var imageLayout = cardElement.querySelector('.popup__photo').cloneNode(true);
      var realImages = fragment.appendChild(imageLayout);
      realImages.src = cardStructure.offer.photos[i];
      cardElement.querySelector('.popup__photos').appendChild(realImages);
    }
    cardElement.querySelector('.popup__photo').parentNode.removeChild(cardElement.querySelector('.popup__photo'));
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

  var mapCardHidden = function () {
    var mapCard = map.querySelectorAll('.map__card');
    for (var i = 0; i < window.utils.PIN_NUMBER; i++) {
      mapCard[i].classList.add('hidden');
    }
  };

  var mapPinHidden = function () {
    var mapCard = map.querySelectorAll('.map__pin');
    for (var i = 1; i <= window.utils.PIN_NUMBER; i++) {
      mapCard[i].classList.add('hidden');
    }
  };

  var createCards = function (cards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.utils.PIN_NUMBER; i++) {
      if (Object.entries(cards[i].offer).length !== 0) {
        fragment.appendChild(createItem(cards[i]));
      }
    }
    map.insertBefore(fragment, filtersContainer);
    mapCardHidden();
  };

  var createPins = function (cards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.utils.PIN_NUMBER; i++) {
      if (Object.entries(cards[i].offer).length !== 0) {
        fragment.appendChild(createPin(cards[i]));
      }
    }
    similarCardElement.appendChild(fragment);
    mapPinHidden();
  };

  window.backend.load(createCards, window.utils.createError);
  window.backend.load(createPins, window.utils.createError);

  window.createElement = {
    mapCardHidden: mapCardHidden
  };
})();
