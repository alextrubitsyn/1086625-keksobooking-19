'use strict';

var NEARBY_ADS = 8;
var PIN_OFFSET_X = 25;
var PIN_OFFSET_Y = 70;
var MIN_X = 1;
var MAX_X = 1200;
var MIN_Y = 130;
var MAX_Y = 630;
var TYPES_RESIDENCE = ["palace", "flat", "house", "bungalo"];
var CONVENIENCES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var CHECK_TIMES = ["12:00", "13:00", "14:00"];
var MIN_PRICE = 1;
var MAX_PRICE = 1000000;


var getRandom = function (elements) {
  return elements[getRandomRange(0, elements.length)];
}

var getRandomRange = function (minNum, maxNum) {
  return Math.floor(Math.random() * (maxNum - minNum)) + minNum;
}

var getRandomSelection = function (elements) {
  var currentElements = elements.slice;
  var countElementsDelete = getRandomRange(0, currentElements.length);
  for (var i = 0; i < countElementsDelete; i++) {
    var selectedNum = getRandomRange(0, currentElements.length);
    currentElements[selectedNum] = currentElements[currentElements.length - 1];
    currentElements.length--;
  }
  return currentElements;
}

var createOffers = function (count) {
  var offers = [];
  var timeChecking = getRandom(CHECK_TIMES);

  for (var i = 0; i < count; i++) {
    var adNum = i + 1;
    var currentX = getRandomRange(MIN_X, MAX_X);
    var currentY = getRandomRange(MIN_Y, MAX_Y);

    offers[i] = {
      author: {
        avatar: "img/avatars/user0" + adNum + ".png"
      },
      offer: {
        title: "Заголовок " + adNum,
        address: currentX + ", " + currentY,
        price: getRandomRange(MIN_PRICE, MAX_PRICE + 1),
        type: getRandom(TYPES_RESIDENCE),
        rooms: getRandomRange(1, 4),
        guests: getRandomRange(0, 4),
        checkin: "после " + timeChecking,
        checkout: "до " + timeChecking,
        features: getRandomSelection(CONVENIENCES),
        description: "строка с описанием " + adNum,
        photos: ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"]
      },
      location: {
        x: currentX,
        y: currentY
      }
    }
  }
  return offers;
};


var renderPin = function (element) {
  var pinElement = nearbyPinTemplate.cloneNode(true);
  pinElement.style.cssText = "left: " + (element.location.x - PIN_OFFSET_X) + "px; top: " + (element.location.y - PIN_OFFSET_Y) + "px;";
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
