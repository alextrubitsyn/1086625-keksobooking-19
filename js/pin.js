'use strict';

(function () {
  var renderPin = function (element) {
    var nearbyPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = nearbyPinTemplate.cloneNode(true);
    pinElement.style.cssText = 'left: ' + (element.location.x - window.data.PIN_OFFSET_X) + 'px; top: ' + (element.location.y - window.data.PIN_OFFSET_Y) + 'px;';
    pinElement.querySelector('img').src = element.author.avatar;
    pinElement.querySelector('img').alt = element.offer.title;
    return pinElement;
  };

  window.pin = {
    renderPin: renderPin
  };

})();
