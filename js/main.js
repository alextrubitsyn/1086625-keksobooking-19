'use strict';

var NEARBY_ADS = 8;
var PIN_OFFSET_X = 25;
var PIN_OFFSET_Y = 70;
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


var getRandom = function (elements) {
  return elements[getRandomRange(0, elements.length)];
};

var getRandomRange = function (minElement, maxElement) {
  return Math.floor(Math.random() * (maxElement - minElement)) + minElement;
};

var getRandomSelection = function (elements) {
  var currentElements = elements.slice();
  var countElementsDelete = getRandomRange(0, currentElements.length);
  for (var i = 0; i < countElementsDelete; i++) {
    var selectedElement = getRandomRange(0, currentElements.length);
    currentElements[selectedElement] = currentElements[currentElements.length - 1];
    currentElements.length--;
  }
  return currentElements;
};

var getArrayPhotos = function (countPhotos) {
  var elements = [];
  for (var i = 0; i <= getRandomRange(0, countPhotos); i++) {
    elements[i] = 'http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg';
  }
  return elements;
};

var createOffers = function (count) {
  var offers = [];

  for (var i = 0; i < count; i++) {
    var timeChecking = getRandom(CHECK_TIMES);
    var sequenceNumber = i + 1;
    var currentX = getRandomRange(MIN_X, MAX_X);
    var currentY = getRandomRange(MIN_Y, MAX_Y);

    offers[i] = {
      author: {
        avatar: 'img/avatars/user0' + sequenceNumber + '.png'
      },
      offer: {
        title: 'Заголовок ' + sequenceNumber,
        address: currentX + ', ' + currentY,
        price: getRandomRange(MIN_PRICE, MAX_PRICE + 1),
        type: getRandom(TYPES_RESIDENCE),
        rooms: getRandomRange(MIN_COUNT_ROOMS, MAX_COUNT_ROOMS + 1),
        guests: getRandomRange(MIN_COUNT_GUESTS, MAX_COUNT_GUESTS + 1),
        checkin: 'после ' + timeChecking,
        checkout: 'до ' + timeChecking,
        features: getRandomSelection(CONVENIENCES),
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


var renderPin = function (element) {
  var pinElement = nearbyPinTemplate.cloneNode(true);
  pinElement.style.cssText = 'left: ' + (element.location.x - PIN_OFFSET_X) + 'px; top: ' + (element.location.y - PIN_OFFSET_Y) + 'px;';
  pinElement.querySelector('img').src = element.author.avatar;
  pinElement.querySelector('img').alt = element.offer.title;
  return pinElement;
};

var makePinBlock = function (elements) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < elements.length; i++) {
    fragment.appendChild(renderPin(elements[i]));
  }
  nearbyPin.appendChild(fragment);
};

document.querySelector('.map').classList.remove('map--faded');
var nearbyPin = document.querySelector('.map__pins');
var nearbyPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');


makePinBlock(createOffers(NEARBY_ADS));
