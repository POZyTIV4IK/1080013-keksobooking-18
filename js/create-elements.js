'use strict';

(function () {
  var map = document.querySelector('.map');
  var filtersContainer = map.querySelector('.map__filters-container');
  var advertPinsContainer = map.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var advertModalWindowTemplate = document.querySelector('#card')
      .content
      .querySelector('.map__card');

  var advertPinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

  var createAdvertCardStructure = function (cardStructure) {
    var cardElement = advertModalWindowTemplate.cloneNode(true);
    var popupPhoto = cardElement.querySelector('.popup__photo');

    cardElement.querySelector('.popup__avatar').src = cardStructure.author.avatar;
    cardElement.querySelector('.popup__title').textContent = cardStructure.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = cardStructure.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = cardStructure.offer.price + '₽/ночь.';
    cardElement.querySelector('.popup__type').textContent = cardStructure.offer.type;
    cardElement.querySelector('.popup__text--capacity').textContent = cardStructure.offer.rooms + ' комнаты для ' + cardStructure.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardStructure.offer.checkin + ', выезд до ' + cardStructure.offer.checkout;
    cardElement.querySelector('.popup__features').textContent = cardStructure.offer.features;
    cardElement.querySelector('.popup__description').textContent = cardStructure.offer.description;

    cardStructure.offer.photos.forEach(function (cardStructurePhoto) {
      var imageLayout = popupPhoto.cloneNode(true);
      var realImages = fragment.appendChild(imageLayout);
      realImages.src = cardStructurePhoto;
      cardElement.querySelector('.popup__photos').appendChild(realImages);
    });

    popupPhoto.parentNode.removeChild(popupPhoto);

    return cardElement;
  };

  var createAdvertPinStructure = function (pinStructure) {
    var cardPin = advertPinTemplate.cloneNode(true);

    cardPin.style = 'left: ' + (pinStructure.location.x - window.utils.PIN_SIZE / 2) + 'px; ' + 'top: ' + (pinStructure.location.y - window.utils.PIN_SIZE) + 'px;';
    cardPin.querySelector('img').src = pinStructure.author.avatar;
    cardPin.querySelector('img').alt = pinStructure.offer.title;
    cardPin.classList.add('map__pin-advert');

    return cardPin;
  };

  var hideAdvertElementsOnMap = function (elementClass) {
    var mapElementCards = map.querySelectorAll(elementClass);

    mapElementCards.forEach(function (mapElementCard) {
      mapElementCard.classList.add('hidden');
    });
  };

  var renderItems = function (items, itemStructureGenerator) {
    items.forEach(function (item) {
      if (Object.entries(item.offer).length !== 0) {
        fragment.appendChild(itemStructureGenerator(item));
      }
    });
  };

  var renderAdvertCardsOnMap = function (cards) {
    renderItems(cards.slice(0, window.utils.MAX_PIN_NUMBER), createAdvertCardStructure);
    map.insertBefore(fragment, filtersContainer);
    hideAdvertElementsOnMap('.map__card');
  };

  var renderAdvertPinsOnMap = function (cards) {
    renderItems(cards.slice(0, window.utils.MAX_PIN_NUMBER), createAdvertPinStructure);
    advertPinsContainer.appendChild(fragment);
    hideAdvertElementsOnMap('.map__pin-advert');
  };

  window.createElements = {
    hideAdvertElementsOnMap: hideAdvertElementsOnMap,
    renderAdvertPinsOnMap: renderAdvertPinsOnMap,
    renderAdvertCardsOnMap: renderAdvertCardsOnMap
  };
})();
