'use strict';

// var NEARBY_ADS = 8;
// var PIN_OFFSET_X = 25;
// var PIN_OFFSET_Y = 70;
// var MIN_X = 1;
// var MAX_X = 1200;
// var MIN_Y = 130;
// var MAX_Y = 630;
// var TYPES_RESIDENCE = ['palace', 'flat', 'house', 'bungalo'];
// var TYPES_RESIDENCE_TRANSLATE = {
//   'palace': 'Дворец', 'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'
// };
// var CONVENIENCES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
// var CONVENIENCES_TRANSLATE = {
//   'wifi': 'Wi-Fi', 'dishwasher': 'кухня', 'parking': 'парковка', 'washer': 'стиралка', 'elevator': 'лифт', 'conditioner': 'кондиционер'
// };
// var CHECK_TIMES = ['12:00', '13:00', '14:00'];
// var MIN_PRICE = 1;
// var MAX_PRICE = 1000000;
// var MIN_COUNT_ROOMS = 1;
var MAX_COUNT_ROOMS = 3;
// var MIN_COUNT_GUESTS = 0;
// var MAX_COUNT_GUESTS = 3;
// var COUNT_PHOTOS = 3;
var CAPACITY_ROOMS = ['для 1 гостя', 'для 2 гостей', 'для 3 гостей', 'не для гостей'];
var ENTER_KEY = 'Enter';
var MAP_PIN_OFFSET_X = 33;
var MAP_PIN_OFFSET_Y_NOT_ACTIVE = 33;
var MAP_PIN_OFFSET_Y_ACTIVATION = 48;
// var MAP_PIN_OFFSET_Y = 81;
// var getRandom = function (elements) {
//   return elements[getRandomRange(0, elements.length)];
// };

// var getRandomRange = function (minElement, maxElement) {
//   return Math.floor(Math.random() * (maxElement - minElement)) + minElement;
// };

// var getRandomSelection = function (elements) {
//   var currentElements = elements.slice();
//   var countElementsDelete = getRandomRange(0, currentElements.length);
//   for (var i = 0; i < countElementsDelete; i++) {
//     var selectedElement = getRandomRange(0, currentElements.length);
//     currentElements[selectedElement] = currentElements[currentElements.length - 1];
//     currentElements.length--;
//   }
//   return currentElements;
// };

// var getArrayPhotos = function (countPhotos) {
//   var elements = [];
//   var countRamdomPhotos = getRandomRange(0, countPhotos);
//   for (var i = 0; i <= countRamdomPhotos; i++) {
//     elements[i] = 'http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg';
//   }
//   return elements;
// };

// var createOffers = function (count) {
//   var offers = [];

//   for (var i = 0; i < count; i++) {
//     var timeChecking = getRandom(CHECK_TIMES);
//     var sequenceNumber = i + 1;
//     var currentX = getRandomRange(MIN_X, MAX_X);
//     var currentY = getRandomRange(MIN_Y, MAX_Y);

//     offers[i] = {
//       author: {
//         avatar: 'img/avatars/user0' + sequenceNumber + '.png'
//       },
//       offer: {
//         title: 'Заголовок ' + sequenceNumber,
//         address: currentX + ', ' + currentY,
//         price: getRandomRange(MIN_PRICE, MAX_PRICE + 1),
//         type: getRandom(TYPES_RESIDENCE),
//         rooms: getRandomRange(MIN_COUNT_ROOMS, MAX_COUNT_ROOMS + 1),
//         guests: getRandomRange(MIN_COUNT_GUESTS, MAX_COUNT_GUESTS + 1),
//         checkin: timeChecking,
//         checkout: timeChecking,
//         features: getRandomSelection(CONVENIENCES),
//         description: 'строка с описанием ' + sequenceNumber,
//         photos: getArrayPhotos(COUNT_PHOTOS)
//       },
//       location: {
//         x: currentX,
//         y: currentY
//       }
//     };
//   }
//   return offers;
// };


// var renderPin = function (element) {
//   var nearbyPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
//   var pinElement = nearbyPinTemplate.cloneNode(true);
//   pinElement.style.cssText = 'left: ' + (element.location.x - PIN_OFFSET_X) + 'px; top: ' + (element.location.y - PIN_OFFSET_Y) + 'px;';
//   pinElement.querySelector('img').src = element.author.avatar;
//   pinElement.querySelector('img').alt = element.offer.title;
//   return pinElement;
// };

// var makePinBlock = function (elements) {
//   var fragment = document.createDocumentFragment();
//   for (var i = 0; i < elements.length; i++) {
//     fragment.appendChild(renderPin(elements[i]));
//   }
//   return fragment;
// };


// var makePhraseRoomsGuests = function (countRooms, countGuests) {
//   var wordRooms = ' комнаты';
//   var wordGuests = ' гостей';
//   if (countRooms === 1) {
//     wordRooms = ' комната';
//   }
//   if (countRooms > 4) {
//     wordRooms = ' комнат';
//   }
//   if (countGuests === 1) {
//     wordGuests = ' гостя';
//   }
//   if (countRooms === 100) {
//     wordRooms = ' комнат не';
//     countGuests = '';
//   }
//   return countRooms + wordRooms + ' для ' + countGuests + wordGuests;
// };

// var renderCard = function (element) {
//   cardElement.querySelector('.popup__avatar').src = element.author.avatar;
//   cardElement.querySelector('.popup__title').textContent = element.offer.title;
//   cardElement.querySelector('.popup__text--address').textContent = element.offer.address;
//   cardElement.querySelector('.popup__text--price').childNodes[0].textContent = element.offer.price + '₽';
//   cardElement.querySelector('.popup__type').textContent = TYPES_RESIDENCE_TRANSLATE[element.offer.type];
//   cardElement.querySelector('.popup__text--capacity').textContent =
//     makePhraseRoomsGuests(element.offer.rooms, element.offer.guests);
//   cardElement.querySelector('.popup__text--time').textContent =
//     'Заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;

// Заполнение блока features
// var feature = cardElement.querySelector('.popup__features');
// if (element.offer.features.length === 0) {
//   feature.style.cssText = 'display: none;';
// } else {
//   for (var i = 1; i < feature.childNodes.length; i = i + 2) {
//     var featureName = feature.childNodes[i].className.split('--')[1];
//     if (!element.offer.features.includes(featureName)) {
//       feature.childNodes[i].style.cssText = 'display: none;';
//     } else {
//       feature.childNodes[i].textContent = CONVENIENCES_TRANSLATE[featureName];
//     }
//   }
// };
// -----------------------------------------
// cardElement.querySelector('.popup__description').textContent = element.offer.description;

//   var cardPhoto = cardElement.querySelector('.popup__photo');
//   if (element.offer.photos.length > 0) {
//     cardPhoto.src = element.offer.photos[0];
//     for (i = 1; i < element.offer.photos.length; i++) {
//       var newPhoto = cardPhoto.cloneNode(true);
//       newPhoto.src = element.offer.photos[i];
//       cardPhoto.after(newPhoto);
//     }
//   } else {
//     cardPhoto.hidden = true;
//   }
//   return cardElement;
// };

// var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
// var nearbyPin = document.querySelector('.map__pins');
// var offers = createOffers(NEARBY_ADS);
// nearbyPin.appendChild(makePinBlock(offers));

// var cardElement = cardTemplate.cloneNode(true);
// document.querySelector('.map__filters-container').before(renderCard(offers[0]));

var adForm = document.querySelector('.ad-form');
var adFormHeader = adForm.querySelector('.ad-form-header');
var adFormElements = adForm.querySelectorAll('.ad-form__element');
var mapFilters = document.querySelectorAll('.map__filter');
var mapFeature = document.querySelector('.map__features');
var mapPinMain = document.querySelector('.map__pin--main');
var address = document.querySelector('#address');
var roomsSelector = adForm.querySelector('#room_number');
var guestsSelector = adForm.querySelector('#capacity');

var changeDisabledElements = function (elements, disabledElement) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].disabled = disabledElement;
  }
};

var getAddressValue = function (elementX, elementY) {
  return elementX + ', ' + elementY;
};

var getSelectCapacity = function (countRooms) {
  guestsSelector.options.length = 0;
  if (countRooms <= MAX_COUNT_ROOMS) {
    for (var i = 0; i < countRooms; i++) {
      guestsSelector[i] = new Option(CAPACITY_ROOMS[i], i + 1);
    }
  } else {
    guestsSelector[0] = new Option(CAPACITY_ROOMS[CAPACITY_ROOMS.length - 1], 0);
  }
  guestsSelector.options[0].selected = true;
  return;
};

var searchValueSelected = function (element) {
  var selectedIndex = element.options.selectedIndex;
  return element.options[selectedIndex].value;
};

var titleCapacity = adForm.querySelector('label[for="capacity"]');

var checkValidityRooms = function (countRooms) {
  var indexGuestsSelected = guestsSelector.options.selectedIndex;
  var returnLabelRooms = function () {
    titleCapacity.innerText = titleCapacityText;
    titleCapacity.style.color = '';
  };
  if (countRooms < guestsSelector.options[indexGuestsSelected].value && countRooms < 100) {
    var titleCapacityText = titleCapacity.innerText;
    titleCapacity.innerText = 'Выберите заново!';
    titleCapacity.style.color = 'red';
    setTimeout(returnLabelRooms, 1000);
  }
};

// Начальное неактивное состояние
adFormHeader.disabled = true;
changeDisabledElements(adFormElements, true);
mapFeature.disabled = true;
changeDisabledElements(mapFilters, true);
var addressX = Math.floor(+mapPinMain.style.left.split('px')[0] + MAP_PIN_OFFSET_X);
var addressY = Math.floor(+mapPinMain.style.top.split('px')[0] + MAP_PIN_OFFSET_Y_NOT_ACTIVE);
address.value = getAddressValue(addressX, addressY);
// -------------------------------

var onPinCapture = function (evt) {
  if (evt.button === 0 || evt.key === ENTER_KEY) {
    adForm.classList.remove('ad-form--disabled');
    adFormHeader.disabled = false;
    changeDisabledElements(adFormElements, false);
    mapFeature.disabled = false;
    changeDisabledElements(mapFilters, false);
    document.querySelector('.map').classList.remove('map--faded');
    addressY += MAP_PIN_OFFSET_Y_ACTIVATION;
    address.defaultValue = getAddressValue(addressX, addressY);
    address.value = address.defaultValue;
    address.disabled = true;
    getSelectCapacity(searchValueSelected(roomsSelector));
  }
};

mapPinMain.addEventListener('mousedown', onPinCapture);
mapPinMain.addEventListener('keydown', onPinCapture);

var onRoomSelectorChange = function () {
  var valueSelected = searchValueSelected(roomsSelector);
  checkValidityRooms(valueSelected);
  getSelectCapacity(valueSelected);

};

roomsSelector.addEventListener('change', onRoomSelectorChange);


// debugger;
