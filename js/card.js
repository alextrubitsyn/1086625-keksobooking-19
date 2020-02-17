'use strict';

(function () {

  var TYPES_RESIDENCE_TRANSLATE = {
    'palace': 'Дворец', 'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'
  };
  var CONVENIENCES_TRANSLATE = {
    'wifi': 'Wi-Fi', 'dishwasher': 'кухня', 'parking': 'парковка', 'washer': 'стиралка', 'elevator': 'лифт', 'conditioner': 'кондиционер'
  };

  var makePhraseRoomsGuests = function (countRooms, countGuests) {
    var wordRooms = ' комнаты';
    var wordGuests = ' гостей';
    if (countRooms === 1) {
      wordRooms = ' комната';
    }
    if (countRooms > 4 || countRooms === 0) {
      wordRooms = ' комнат';
    }
    if (countGuests === 1) {
      wordGuests = ' гостя';
    }
    if (countRooms === window.data.PALAS_COUNT_ROOMS) {
      wordRooms = ' комнат не';
      countGuests = '';
    }
    return countRooms + wordRooms + ' для ' + countGuests + wordGuests;
  };

  var render = function (element) {
    var FEATURE_CLASS = 'popup__feature';
    var cardElement = window.data.cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__avatar').src = element.author.avatar;
    cardElement.querySelector('.popup__title').textContent = element.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = element.offer.address;
    cardElement.querySelector('.popup__text--price').childNodes[0].textContent = element.offer.price + '₽';
    cardElement.querySelector('.popup__type').textContent = TYPES_RESIDENCE_TRANSLATE[element.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent =
      makePhraseRoomsGuests(element.offer.rooms, element.offer.guests);
    cardElement.querySelector('.popup__text--time').textContent =
      'Заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;

    // Заполнение блока features
    var feature = cardElement.querySelector('.popup__features');

    if (element.offer.features.length === 0) {
      feature.style.cssText = 'display: none;';
    } else {
      feature.innerHTML = '';
      for (var i = 0; i < element.offer.features.length; i++) {
        var featureCard = document.createElement('li');
        featureCard.classList.add(FEATURE_CLASS, FEATURE_CLASS + '--' + element.offer.features[i]);
        featureCard.textContent = CONVENIENCES_TRANSLATE[element.offer.features[i]];
        feature.appendChild(featureCard);
      }
    }
    // -----------------------------------------
    cardElement.querySelector('.popup__description').textContent = element.offer.description;

    var cardPhoto = cardElement.querySelector('.popup__photo');
    if (element.offer.photos.length > 0) {
      cardPhoto.src = element.offer.photos[0];
      for (var j = 1; j < element.offer.photos.length; j++) {
        var newPhoto = cardPhoto.cloneNode(true);
        newPhoto.src = element.offer.photos[j];
        cardPhoto.after(newPhoto);
      }
    } else {
      cardPhoto.parentNode.hidden = true;
    }
    return cardElement;
  };

  window.card = {
    render: render
  };

})();
