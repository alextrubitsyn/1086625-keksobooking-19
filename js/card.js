'use strict';

(function () {

  var makePhraseRoomsGuests = function (countRooms, countGuests) {
    var wordRooms = ' комнаты';
    var wordGuests = ' гостей';
    if (countRooms === 1) {
      wordRooms = ' комната';
    }
    if (countRooms > 4) {
      wordRooms = ' комнат';
    }
    if (countGuests === 1) {
      wordGuests = ' гостя';
    }
    if (countRooms === 100) {
      wordRooms = ' комнат не';
      countGuests = '';
    }
    return countRooms + wordRooms + ' для ' + countGuests + wordGuests;
  };


  var renderCard = function (element) {
    cardElement.querySelector('.popup__avatar').src = element.author.avatar;
    cardElement.querySelector('.popup__title').textContent = element.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = element.offer.address;
    cardElement.querySelector('.popup__text--price').childNodes[0].textContent = element.offer.price + '₽';
    cardElement.querySelector('.popup__type').textContent = window.data.TYPES_RESIDENCE_TRANSLATE[element.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent =
      makePhraseRoomsGuests(element.offer.rooms, element.offer.guests);
    cardElement.querySelector('.popup__text--time').textContent =
      'Заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;

    // Заполнение блока features
    var feature = cardElement.querySelector('.popup__features');
    if (element.offer.features.length === 0) {
      feature.style.cssText = 'display: none;';
    } else {
      for (var i = 1; i < feature.childNodes.length; i = i + 2) {
        var featureName = feature.childNodes[i].className.split('--')[1];
        if (!element.offer.features.includes(featureName)) {
          feature.childNodes[i].style.cssText = 'display: none;';
        } else {
          feature.childNodes[i].textContent = window.data.CONVENIENCES_TRANSLATE[featureName];
        }
      }
    }
    // -----------------------------------------
    cardElement.querySelector('.popup__description').textContent = element.offer.description;

    var cardPhoto = cardElement.querySelector('.popup__photo');
    if (element.offer.photos.length > 0) {
      cardPhoto.src = element.offer.photos[0];
      for (i = 1; i < element.offer.photos.length; i++) {
        var newPhoto = cardPhoto.cloneNode(true);
        newPhoto.src = element.offer.photos[i];
        cardPhoto.after(newPhoto);
      }
    } else {
      cardPhoto.hidden = true;
    }
    return cardElement;
  };

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var cardElement = cardTemplate.cloneNode(true);
  document.querySelector('.map__filters-container').before(renderCard(window.data.offers[0]));


})();
