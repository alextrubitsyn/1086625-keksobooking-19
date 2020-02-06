'use strict';

var NEARBY_ADS = 8;
var PIN_OFFSET_X = 25;
var PIN_OFFSET_Y = 70;
var MIN_X = 1;
var MAX_X = 1200;
var MIN_Y = 130;
var MAX_Y = 630;
var TYPES_RESIDENCE = ['palace', 'flat', 'house', 'bungalo'];
// var TYPES_RESIDENCE_TRANSLATE = {
//   'palace': 'Дворец', 'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'
// };
var CONVENIENCES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
// var CONVENIENCES_TRANSLATE = {
//   'wifi': 'Wi-Fi', 'dishwasher': 'кухня', 'parking': 'парковка', 'washer': 'стиралка', 'elevator': 'лифт', 'conditioner': 'кондиционер'
// };
var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var MIN_PRICE = 1;
var MAX_PRICE = 1000000;
var MIN_COUNT_ROOMS = 1;
var MAX_COUNT_ROOMS = 3;
var PALAS_COUNT_ROOMS = 100;
var MIN_COUNT_GUESTS = 0;
var MAX_COUNT_GUESTS = 3;
var COUNT_PHOTOS = 3;
// var CAPACITY_ROOMS = ['для 1 гостя', 'для 2 гостей', 'для 3 гостей', 'не для гостей'];
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
// var MAP_PIN_OFFSET_Y = 81;
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

//   // Заполнение блока features
//   var feature = cardElement.querySelector('.popup__features');
//   if (element.offer.features.length === 0) {
//     feature.style.cssText = 'display: none;';
//   } else {
//     for (var i = 1; i < feature.childNodes.length; i = i + 2) {
//       var featureName = feature.childNodes[i].className.split('--')[1];
//       if (!element.offer.features.includes(featureName)) {
//         feature.childNodes[i].style.cssText = 'display: none;';
//       } else {
//         feature.childNodes[i].textContent = CONVENIENCES_TRANSLATE[featureName];
//       }
//     }
//   };
// -----------------------------------------
//   cardElement.querySelector('.popup__description').textContent = element.offer.description;

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
var nearbyPin = document.querySelector('.map__pins');
var offers = createOffers(NEARBY_ADS);


// var cardElement = cardTemplate.cloneNode(true);
// document.querySelector('.map__filters-container').before(renderCard(offers[0]));

var adForm = document.querySelector('.ad-form');
var mapPinMain = document.querySelector('.map__pin--main');
var address = document.querySelector('#address');
var roomsSelector = adForm.querySelector('#room_number');
var guestsSelector = adForm.querySelector('#capacity');
var map = document.querySelector('.map');
var mapElementsActivate = map.querySelector('.map__filters').children;
var adFormElementsActivate = adForm.children;

var changeDisabledElements = function (elements, disabledStatus) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].disabled = disabledStatus;
  }
};

var getAddressValue = function (elementX, elementY) {
  return elementX + ', ' + elementY;
};

// var createOption = function (optionText, optionValue) {
//   var newOption = document.createElement('option');
//   newOption.value = optionValue;
//   newOption.text = optionText;
//   return newOption;
// };

// var getSelectCapacity = function (countRooms) {
//   guestsSelector.innerHTML = '';
//   if (countRooms <= MAX_COUNT_ROOMS) {
//     for (var i = 0; i < countRooms; i++) {
//       guestsSelector.appendChild(createOption(CAPACITY_ROOMS[i], String(i + 1)));
//     }
//   } else {
//     guestsSelector.appendChild(createOption(CAPACITY_ROOMS[3], '0'));
//   }
//   guestsSelector.options[0].selected = true;
//   return;
// };

var searchValueSelected = function (element) {
  var selectedIndex = element.options.selectedIndex;
  return element.options[selectedIndex].value;
};


var checkValidityRoomsGuests = function () {
  var selectedRoomsValue = +searchValueSelected(roomsSelector);
  var selectedGuestsValue = +searchValueSelected(guestsSelector);
  var statusValidity = selectedGuestsValue <= selectedRoomsValue && selectedRoomsValue <= MAX_COUNT_GUESTS && selectedGuestsValue > 0 || selectedRoomsValue === PALAS_COUNT_ROOMS && selectedGuestsValue === MIN_COUNT_GUESTS;
  if (statusValidity) {
    var messageValidity = '';
  } else {
    messageValidity = VALIDITY_MESSAGES[selectedRoomsValue] + '! Измените выбор количества гостей, или комнат!';
  }
  guestsSelector.setCustomValidity(messageValidity);
};

var onPinClick = function (evt) {
  if (evt.button === 0) {
    activatePage();
  }
};

var onPinEnter = function (evt) {
  if (evt.key === ENTER_KEY) {
    activatePage();
  }
};

var onRoomSelectorChange = function () {
  checkValidityRoomsGuests();
};

var onGuestSelectorChange = function () {
  checkValidityRoomsGuests();
};

var activatePage = function () {
  adForm.classList.remove('ad-form--disabled');
  changeDisabledElements(adFormElementsActivate, false);
  changeDisabledElements(mapElementsActivate, false);
  map.classList.remove('map--faded');
  addressY += MAP_PIN_OFFSET_Y_ACTIVATION;
  address.defaultValue = getAddressValue(addressX, addressY);
  address.value = address.defaultValue;
  address.readOnly = true;
  // getSelectCapacity(searchValueSelected(roomsSelector));
  checkValidityRoomsGuests();
  mapPinMain.removeEventListener('mousedown', onPinClick);
  mapPinMain.removeEventListener('keydown', onPinEnter);
  guestsSelector.addEventListener('change', onGuestSelectorChange);
  roomsSelector.addEventListener('change', onRoomSelectorChange);
  nearbyPin.appendChild(makePinBlock(offers));
};


// var titleCapacity = adForm.querySelector('label[for="capacity"]');

// var checkValidityRooms = function (countRooms) {
//   var indexGuestsSelected = guestsSelector.options.selectedIndex;
//   var returnFieldsetRooms = function () {
//     titleCapacity.innerText = titleCapacityText;
//     titleCapacity.style.color = titleCapacityColor;
//     guestsSelector.style.border = borderSelestGuests;
//   };
//   var statusValidity = countRooms < +guestsSelector.options[indexGuestsSelected].value && countRooms < PALAS_COUNT_ROOMS;
//   if (statusValidity) {
//     var titleCapacityText = titleCapacity.innerText;
//     var titleCapacityColor = titleCapacity.style.color;
//     var borderSelestGuests = guestsSelector.style.border;
//     guestsSelector.style.border = '2px solid red';
//     titleCapacity.innerText = 'Выберите заново!';
//     titleCapacity.style.color = 'red';
//     setTimeout(returnFieldsetRooms, 2000);
//   }
//   return statusValidity;
// };

// Начальное неактивное состояние
changeDisabledElements(adFormElementsActivate, true);
changeDisabledElements(mapElementsActivate, true);
var addressX = Math.floor(+mapPinMain.style.left.split('px')[0] + MAP_PIN_OFFSET_X);
var addressY = Math.floor(+mapPinMain.style.top.split('px')[0] + MAP_PIN_OFFSET_Y_NOT_ACTIVE);
address.value = getAddressValue(addressX, addressY);
mapPinMain.addEventListener('mousedown', onPinClick);
mapPinMain.addEventListener('keydown', onPinEnter);
// -------------------------------

// debugger;
