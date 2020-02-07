'use strict';


(function () {

  var makePinBlock = function (elements) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < elements.length; i++) {
      fragment.appendChild(window.pin.renderPin(elements[i]));
    }
    return fragment;
  };

  window.map = {
    makePinBlock: makePinBlock
  };

})();
