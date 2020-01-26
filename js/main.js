var NEARBY_ADS = 8;

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
    offers[i] = {
      author: {
        avatar: "img/avatars/user0" + (i + 1) + ".png"
      },
      offer: {
        title: "Заголовок " + (i + 1),
        address: "600, 350",
        price: getRandomRange(100, 500),
        type: getRandom(typesResidence),
        rooms: getRandomRange(1, 3),
        guests: getRandomRange(1, 5),
        checkin: getRandom(timeChecking),
        checkout: getRandom(timeChecking),
        features: getRandomSelect(conveniences),
        description: "строка с описанием " + (i + 1),
        photos: getRandom(photoAddresses)
      },
      location: {
        x: getRandomRange(MIN_X, MAX_X),
        y: getRandomRange(MIN_Y, MAX_Y)
      }
    }
  }
  return offers;
}

debugger;
