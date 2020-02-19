'use strict';

(function () {

  var selectPins = function () {
    var type = window.util.searchValueSelected(window.data.mapFilterType);
    if (window.data.offers) {
      window.data.updateOffers = window.data.offers.filter(function (pin) {
        var statusType = type === 'any' ? true : pin.offer.type === type;
        return statusType;
      });
      if (window.data.cardOffer) {
        window.data.closeListeners();
        window.data.cardOffer.remove();
      }
      window.pin.erase();
      window.data.pinList.appendChild(window.pin.makeBlock(window.data.updateOffers));
    }
  };

  var start = function () {
    var onTypeChange = function () {
      selectPins();
    };

    window.data.mapFilterType.addEventListener('change', onTypeChange);
  };

  window.filter = {
    start: start,
    selectPins: selectPins
  };

})();
