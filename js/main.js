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
  var countRamdomPhotos = getRandomRange(0, countPhotos);
  for (var i = 0; i <= countRamdomPhotos; i++) {
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
        checkin: timeChecking,
        checkout: timeChecking,
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
  var nearbyPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
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
  return fragment;
};

var translateNameHousing = function (element) {
  var nameHousing = '';
  switch (element) {
    case 'palace':
      nameHousing = 'Дворец';
      break;
    case 'flat':
      nameHousing = 'Квартира';
      break;
    case 'house':
      nameHousing = 'Дом';
      break;
    case 'bungalo':
      nameHousing = 'Бунгало';
      break;
  }
  return nameHousing;
};

var makePhraseRoomsGuests = function (countRooms, countGuests) {
  var wordRooms = ' комнаты';
  var wordGuests = ' гостей';
  if (countRooms === 1) {
    wordRooms = ' комната';
  }
  if (countGuests === 1) {
    wordGuests = ' гостя';
  }
  if (countRooms === 100) {
    wordGuests = ' не для гостей';
  }
  return countRooms + wordRooms + ' для ' + countGuests + wordGuests;
};

var renderCard = function (element) {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__avatar').scr = element.author.avatar;
  cardElement.querySelector('.popup__title').textContent = element.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = element.offer.address;
  cardElement.querySelector('.popup__text--price').childNodes[0].textContent = element.offer.price + '₽';
  cardElement.querySelector('.popup__type').textContent = translateNameHousing(element.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent =
    makePhraseRoomsGuests(element.offer.rooms, element.offer.guests);
  cardElement.querySelector('.popup__text--time').textContent =
    'Заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;
  if (!element.offer.features.includes('wi-fi')) {
    cardElement.querySelector('.popup__feature--wifi').style.cssText = 'display: none;';
  } else {
    cardElement.querySelector('.popup__feature--wifi').textContent = 'wi-fi';
  }
  if (!element.offer.features.includes('dishwasher')) {
    cardElement.querySelector('.popup__feature--dishwasher').style.cssText = 'display: none;';
  } else {
    cardElement.querySelector('.popup__feature--dishwasher').textContent = 'посудомоечная машина';
  }
  if (!element.offer.features.includes('parking')) {
    cardElement.querySelector('.popup__feature--parking').style.cssText = 'display: none;';
  } else {
    cardElement.querySelector('.popup__feature--parking').textContent = 'паркинг';
  }
  if (!element.offer.features.includes('washer')) {
    cardElement.querySelector('.popup__feature--washer').style.cssText = 'display: none;';
  } else {
    cardElement.querySelector('.popup__feature--washer').textContent = 'стиральная машина';
  }
  if (!element.offer.features.includes('elevator')) {
    cardElement.querySelector('.popup__feature--elevator').style.cssText = 'display: none;';
  } else {
    cardElement.querySelector('.popup__feature--elevator').textContent = 'лифт';
  }
  if (!element.offer.features.includes('conditioner')) {
    cardElement.querySelector('.popup__feature--conditioner').style.cssText = 'display: none;';
  } else {
    cardElement.querySelector('.popup__feature--conditioner').textContent = 'кондиционер';
  }
  cardElement.querySelector('.popup__description').textContent = element.offer.description;

  var cardPhoto = cardElement.querySelector('.popup__photo');
  if (element.offer.photos.length > 0) {
    cardPhoto.src = element.offer.photos[0];
    for (var i = 1; i < element.offer.photos.length; i++) {
      var newPhoto = cardPhoto.cloneNode(true);
      newPhoto.src = element.offer.photos[i];
      cardPhoto.after(newPhoto);
    }
  } else {
    cardPhoto.hiddem = true;
  }
  return cardElement;
};

document.querySelector('.map').classList.remove('map--faded');
var nearbyPin = document.querySelector('.map__pins');
var offers = createOffers(NEARBY_ADS);
nearbyPin.appendChild(makePinBlock(offers));

document.querySelector('.map__filters-container').before(renderCard(offers[0]));
// debugger;
