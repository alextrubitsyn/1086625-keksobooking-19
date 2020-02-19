'use strict';

(function () {

  var OFFSET_X = 25;
  var OFFSET_Y = 70;
  var MAX_PINS_ON_MAP = 5;

  var render = function (element) {
    if (element.offer) {
      var pinElement = window.data.nearbyPinTemplate.cloneNode(true);
      pinElement.style.cssText = 'left: ' + (element.location.x - OFFSET_X) + 'px; top: ' + (element.location.y - OFFSET_Y) + 'px;';
      pinElement.querySelector('img').src = element.author.avatar;
      pinElement.querySelector('img').alt = element.offer.title;
    }
    return pinElement;
  };

  var makeBlock = function (elements) {
    var countElements = elements.length > MAX_PINS_ON_MAP ? countElements = MAX_PINS_ON_MAP : elements.length;
    var fragment = document.createDocumentFragment();
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
    render: render,
    makeBlock: makeBlock,
    erase: erase,
    OFFSET_X: OFFSET_X,
    OFFSET_Y: OFFSET_Y
  };

})();
