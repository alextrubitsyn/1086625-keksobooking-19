'use strict';

(function () {

  var TYPES_RESIDENCE_TRANSLATE = {
    'palace': 'Дворец', 'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'
  };
  var CONVENIENCES_TRANSLATE = {
    'wifi': 'Wi-Fi', 'dishwasher': 'кухня', 'parking': 'парковка', 'washer': 'стиралка', 'elevator': 'лифт', 'conditioner': 'кондиционер'
  };

  var CLASS_PIN = 'map__pin';
  var CLASS_ACTIVE_PIN = 'map__pin--active';
  var CLASS_MAIN_PIN = 'map__pin--main';
  var PALAS_COUNT_ROOMS = 100;
  var activePin;
  var cardOffer;
  var cardClose;

  var filtersBlock = document.querySelector('.map__filters-container');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');


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
    if (countRooms === PALAS_COUNT_ROOMS) {
      wordRooms = ' комнат не';
      countGuests = '';
    }
    return countRooms + wordRooms + ' для ' + countGuests + wordGuests;
  };

  var render = function (element) {
    var FEATURE_CLASS = 'popup__feature';
    var cardElement = cardTemplate.cloneNode(true);
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

  var onCloseClick = function () {
    close();
  };

  var onCloseKeydown = function (evtClose) {
    if (evtClose.key === window.data.ENTER_KEY) {
      close();
    }
  };

  var onEscapeKeydown = function (evtEscape) {
    if (evtEscape.key === window.data.ESC_KEY) {
      close();
    }
  };

  var close = function () {
    if (cardClose) {
      cardClose.removeEventListener('click', onCloseClick);
      cardClose.removeEventListener('keydown', onCloseKeydown);
      document.removeEventListener('keydown', onEscapeKeydown);
    }
    if (cardOffer) {
      cardOffer.remove();
      cardOffer = '';
      cardClose = '';
    }
    if (activePin) {
      activePin.classList.remove(CLASS_ACTIVE_PIN);
      activePin = '';
    }
  };


  var open = function (target) {
    var pinCheck = target.className === CLASS_PIN || target.parentNode.className === CLASS_PIN;
    var pinActiveCheck = target.className === CLASS_ACTIVE_PIN || target.parentNode.className === CLASS_ACTIVE_PIN;
    var pinMainCheck = target.className === CLASS_MAIN_PIN || target.parentNode.className === CLASS_MAIN_PIN;

    if (pinCheck && !pinMainCheck && !pinActiveCheck) {
      if (!target.className) {
        target = target.parentElement;
      }
      var offer = window.filter.getActualOffer(target.dataset.index);
      if (offer) {
        if (activePin) {
          close();
        }
        target.classList.add(CLASS_ACTIVE_PIN);
        activePin = target;
        cardOffer = render(offer);
        filtersBlock.before(cardOffer);
        if (document.querySelector('.popup__close')) {
          cardClose = document.querySelector('.popup__close');
          cardClose.addEventListener('click', onCloseClick);
          cardClose.addEventListener('keydown', onCloseKeydown);
          document.addEventListener('keydown', onEscapeKeydown);
        }
      }
    }
  };

  window.card = {
    open: open,
    close: close
  };

})();
