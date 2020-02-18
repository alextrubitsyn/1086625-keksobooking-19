'use strict';

(function () {

  var OFFSET_X = 25;
  var OFFSET_Y = 70;

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
    var fragment = document.createDocumentFragment();
    var pinElement;
    for (var i = 0; i < elements.length; i++) {
      pinElement = render(elements[i]);
      pinElement.dataset['index'] = i;
      if (pinElement) {
        fragment.appendChild(pinElement);
      }
    }
    return fragment;
  };


  window.pin = {
    render: render,
    makeBlock: makeBlock,
    OFFSET_X: OFFSET_X,
    OFFSET_Y: OFFSET_Y
  };

})();
