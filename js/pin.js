'use strict';

(function () {

  var OFFSET_X = 25;
  var OFFSET_Y = 70;
  var MAX_COUNT = 5;

  var nearbyPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  var render = function (element) {
    if (element.offer) {
      var pinElement = nearbyPinTemplate.cloneNode(true);
      pinElement.style.cssText = 'left: ' + (element.location.x - OFFSET_X) + 'px; top: ' + (element.location.y - OFFSET_Y) + 'px;';
      pinElement.querySelector('img').src = element.author.avatar;
      pinElement.querySelector('img').alt = element.offer.title;
    }
    return pinElement;
  };

  var makeBlock = function (elements) {
    var countElements = elements.length > MAX_COUNT ? countElements = MAX_COUNT : elements.length;
    var pinElement;
    for (var i = 0; i < countElements; i++) {
      pinElement = render(elements[i]);
      pinElement.dataset['index'] = i;
      if (pinElement) {
        fragment.appendChild(pinElement);
      }
    }
    return fragment;
  };

  var erase = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  };

  window.pin = {
    makeBlock: makeBlock,
    erase: erase,
    MAX_COUNT: MAX_COUNT,
  };

})();
