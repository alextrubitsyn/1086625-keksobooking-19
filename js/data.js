'use strict';

(function () {
  var NEARBY_ADS = 8;
  var PIN_OFFSET_X = 25;
  var PIN_OFFSET_Y = 70;
  var MIN_X = 1;
  var MAX_X = 1200;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var TYPES_RESIDENCE = ['palace', 'flat', 'house', 'bungalo'];
  var TYPES_RESIDENCE_TRANSLATE = {
    'palace': 'Дворец', 'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'
  };
  var CONVENIENCES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var CONVENIENCES_TRANSLATE = {
    'wifi': 'Wi-Fi', 'dishwasher': 'кухня', 'parking': 'парковка', 'washer': 'стиралка', 'elevator': 'лифт', 'conditioner': 'кондиционер'
  };
  var CHECK_TIMES = ['12:00', '13:00', '14:00'];
  var MIN_PRICE = 1;
  var MAX_PRICE = 1000000;
  var MIN_COUNT_ROOMS = 1;
  var MAX_COUNT_ROOMS = 3;
  var PALAS_COUNT_ROOMS = 100;
  var MIN_COUNT_GUESTS = 0;
  var MAX_COUNT_GUESTS = 3;
  var COUNT_PHOTOS = 3;
  var CAPACITY_ROOMS = ['для 1 гостя', 'для 2 гостей', 'для 3 гостей', 'не для гостей'];
  var ENTER_KEY = 'Enter';
  var MAP_PIN_OFFSET_X = 33;
  var MAP_PIN_OFFSET_Y_NOT_ACTIVE = 33;
  var MAP_PIN_OFFSET_Y_ACTIVATION = 48;
  var VALIDITY_MESSAGES = {
    1: 'В 1 комнате возможно проживание только 1 гостя',
    2: 'В 2 комнатах возможно проживание 1 или 2 гостей',
    3: 'В 3 комнатах возможно проживание 1, 2 или 3 гостей',
    100: '100 комнат не для гостей'
  };
  var MAP_PIN_OFFSET_Y = 81;

  var getArrayPhotos = function (countPhotos) {
    var elements = [];
    var countRamdomPhotos = window.util.getRandomRange(0, countPhotos);
    for (var i = 0; i <= countRamdomPhotos; i++) {
      elements[i] = 'http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg';
    }
    return elements;
  };

  var createOffers = function (count) {
    var offers = [];

    for (var i = 0; i < count; i++) {
      var timeChecking = window.util.getRandom(CHECK_TIMES);
      var sequenceNumber = i + 1;
      var currentX = window.util.getRandomRange(MIN_X, MAX_X);
      var currentY = window.util.getRandomRange(MIN_Y, MAX_Y);

      offers[i] = {
        author: {
          avatar: 'img/avatars/user0' + sequenceNumber + '.png'
        },
        offer: {
          title: 'Заголовок ' + sequenceNumber,
          address: currentX + ', ' + currentY,
          price: window.util.getRandomRange(MIN_PRICE, MAX_PRICE + 1),
          type: window.util.getRandom(TYPES_RESIDENCE),
          rooms: window.util.getRandomRange(MIN_COUNT_ROOMS, MAX_COUNT_ROOMS + 1),
          guests: window.util.getRandomRange(MIN_COUNT_GUESTS, MAX_COUNT_GUESTS + 1),
          checkin: timeChecking,
          checkout: timeChecking,
          features: window.util.getRandomSelection(CONVENIENCES),
          description: 'строка с описанием ' + sequenceNumber,
          photos: getArrayPhotos(COUNT_PHOTOS)
        },
        location: {
          x: currentX,
          y: currentY
        }
      };
    }
    return offers;
  };

  var offers = createOffers(NEARBY_ADS);

  window.data = {
    NEARBY_ADS: NEARBY_ADS,
    PIN_OFFSET_X: PIN_OFFSET_X,
    PIN_OFFSET_Y: PIN_OFFSET_Y,
    MIN_X: MIN_X,
    MAX_X: MAX_X,
    MIN_Y: MIN_Y,
    MAX_Y: MAX_Y,
    TYPES_RESIDENCE: TYPES_RESIDENCE,
    TYPES_RESIDENCE_TRANSLATE: TYPES_RESIDENCE_TRANSLATE,
    CONVENIENCES: CONVENIENCES,
    CONVENIENCES_TRANSLATE: CONVENIENCES_TRANSLATE,
    CHECK_TIMES: CHECK_TIMES,
    MIN_PRICE: MIN_PRICE,
    MAX_PRICE: MAX_PRICE,
    MIN_COUNT_ROOMS: MIN_COUNT_ROOMS,
    MAX_COUNT_ROOMS: MAX_COUNT_ROOMS,
    PALAS_COUNT_ROOMS: PALAS_COUNT_ROOMS,
    MIN_COUNT_GUESTS: MIN_COUNT_GUESTS,
    MAX_COUNT_GUESTS: MAX_COUNT_GUESTS,
    COUNT_PHOTOS: COUNT_PHOTOS,
    CAPACITY_ROOMS: CAPACITY_ROOMS,
    ENTER_KEY: ENTER_KEY,
    MAP_PIN_OFFSET_X: MAP_PIN_OFFSET_X,
    MAP_PIN_OFFSET_Y_NOT_ACTIVE: MAP_PIN_OFFSET_Y_NOT_ACTIVE,
    MAP_PIN_OFFSET_Y_ACTIVATION: MAP_PIN_OFFSET_Y_ACTIVATION,
    VALIDITY_MESSAGES: VALIDITY_MESSAGES,
    MAP_PIN_OFFSET_Y: MAP_PIN_OFFSET_Y,
    createOffers: createOffers,
    offers: offers
  };

})();
