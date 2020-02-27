'use strict';

(function () {

  var OFFSET_X = 25;
  var OFFSET_Y = 70;

  var nearbyPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  var render = function (element) {
    if (element.offer) {
      var pinElement = nearbyPinTemplate.cloneNode(true);
      var pinElementImg = pinElement.querySelector('img');
      pinElement.style.cssText = 'left: ' + (element.location.x - OFFSET_X) + 'px; top: ' + (element.location.y - OFFSET_Y) + 'px;';
      pinElementImg.src = element.author.avatar;
      pinElementImg.alt = element.offer.title;
    }
    return pinElement;
  };

  var makeBlock = function (elements) {
    var pinElement;
    elements.forEach(function (element, index) {
      pinElement = render(element);
      if (pinElement) {
        pinElement.dataset['index'] = index;
        fragment.appendChild(pinElement);
      }
    });
    return fragment;
  };

  var erase = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  window.pin = {
    makeBlock: makeBlock,
    erase: erase
  };

})();
