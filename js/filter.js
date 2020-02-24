'use strict';

(function () {
  var offers = [];
  var actualOffers = [];
  var pinList = document.querySelector('.map__pins');
  var mapFilters = document.querySelector('.map__filters');
  var mapFilterType = mapFilters.querySelector('#housing-type');
  // var mapFilterPrice = mapFilters.querySelector('#housing-price');
  // var mapFilterRooms = mapFilters.querySelector('#housing-rooms');
  // var mapFilterGuests = mapFilters.querySelector('#housing-guests');

  var selectPins = function () {
    var type = window.util.searchValueSelected(mapFilterType);
    if (offers.length > 0) {
      actualOffers = [];
      for (var i = 0; i < offers.length; i++) {
        if (offers[i].offer.type === type || type === 'any') {
          actualOffers.push(offers[i]);
          if (actualOffers.length === window.pin.MAX_COUNT) {
            break;
          }
        }
      }
      window.card.close();
      window.pin.erase();
      pinList.appendChild(window.pin.makeBlock(actualOffers));
    }
  };

  var getActualOffer = function (index) {
    return actualOffers[index];
  };

  var receiveOffers = function (elements) {
    offers = elements;
    selectPins();
    activate();
  };

  var onTypeChange = function () {
    selectPins();
  };

  var activate = function () {
    window.util.changeDisabledElements(mapFilters.children, false);
    mapFilterType.addEventListener('change', onTypeChange);
  };

  var disactivate = function () {
    window.util.changeDisabledElements(mapFilters.children, true);
    mapFilterType.removeEventListener('change', onTypeChange);
  };

  window.filter = {
    getActualOffer: getActualOffer,
    receiveOffers: receiveOffers,
    disactivate: disactivate
  };

})();
