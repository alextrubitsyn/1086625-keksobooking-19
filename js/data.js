'use strict';

(function () {
  var NEARBY_ADS = 8;
  var MIN_X = 1;
  var MAX_X = 1200;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var TYPES_RESIDENCE = ['palace', 'flat', 'house', 'bungalo'];
  var CONVENIENCES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var CHECK_TIMES = ['12:00', '13:00', '14:00'];
  var MIN_PRICE = 1;
  var MAX_PRICE = 1000000;
  var MIN_COUNT_ROOMS = 1;
  var MAX_COUNT_ROOMS = 3;
  var MIN_COUNT_GUESTS = 0;
  var MAX_COUNT_GUESTS = 3;
  var COUNT_PHOTOS = 3;
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';

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
    MIN_COUNT_GUESTS: MIN_COUNT_GUESTS,
    MAX_COUNT_GUESTS: MAX_COUNT_GUESTS,
    ESC_KEY: ESC_KEY,
    ENTER_KEY: ENTER_KEY,
    createOffers: createOffers,
    offers: offers
  };

})();
