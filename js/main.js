var NEARBY_ADS = 8;
var PIN_OFFSET_X = 25;
var PIN_OFFSET_Y = 70;

var getRandom = function (elements) {
  return elements[getRandomRange(0, elements.length)];
}

var getRandomRange = function (minNum, maxNum) {
  return Math.floor(Math.random() * (maxNum - minNum)) + minNum;
}

var getRandomSelect = function (elements) {
  list = Array.from(elements);
  var countElementsDel = getRandomRange(1, list.length - 1);
  for (var i = 0; i < countElementsDel; i++) {
    var selectedNum = getRandomRange(0, list.length);
    list[selectedNum] = list[list.length - 1];
    list.length--;
  }
  return list;
}

var createOffers = function (count) {
  var MIN_X = 100;
  var MAX_X = 500;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var offers = [];
  var typesResidence = ["palace", "flat", "house", "bungalo"];
  var conveniences = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
  var timeChecking = ["12:00", "13:00", "14:00"];
  var photoAddresses = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

  for (var i = 0; i < count; i++) {
    var adNum = i + 1;
    offers[i] = {
      author: {
        avatar: "img/avatars/user0" + adNum + ".png"
      },
      offer: {
        title: "Заголовок " + adNum,
        address: "600, 350",
        price: getRandomRange(100, 500),
        type: getRandom(typesResidence),
        rooms: getRandomRange(1, 3),
        guests: getRandomRange(1, 5),
        checkin: getRandom(timeChecking),
        checkout: getRandom(timeChecking),
        features: getRandomSelect(conveniences),
        description: "строка с описанием " + adNum,
        photos: getRandom(photoAddresses)
      },
      location: {
        x: getRandomRange(MIN_X, MAX_X),
        y: getRandomRange(MIN_Y, MAX_Y)
      }
    }
  }
  return offers;
};


var renderPin = function (element) {
  var pinElement = nearbyPinTemplate.cloneNode(true);
  pinElement.style = "left: " + (element.location.x - PIN_OFFSET_X) + "px; top: " + (element.location.y - PIN_OFFSET_Y) + "px;";
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
