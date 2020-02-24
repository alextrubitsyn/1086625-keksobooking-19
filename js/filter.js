'use strict';

(function () {
  var PRICE_RANGES = {
    'any': [0, Infinity],
    'low': [0, 9999.99999999],
    'middle': [10000, 50000],
    'high': [50000.0000001, Infinity]
  };
  var INDEX_MIN_PRICE = 0;
  var INDEX_MAX_PRICE = 1;
  var ANY_CHOICE = 'any';
  var offers = [];
  var actualOffers = [];
  var pinList = document.querySelector('.map__pins');
  var mapFilters = document.querySelector('.map__filters');
  var mapFilterType = mapFilters.querySelector('#housing-type');
  var mapFilterPrice = mapFilters.querySelector('#housing-price');
  var mapFilterRooms = mapFilters.querySelector('#housing-rooms');
  var mapFilterGuests = mapFilters.querySelector('#housing-guests');
  var mapFilterFeatures = mapFilters.querySelector('#housing-features');
  var featureElements = mapFilterFeatures.querySelectorAll('input');

  var selectPins = function () {
    if (offers.length > 0) {
      var type = window.util.searchValueSelected(mapFilterType);
      var price = window.util.searchValueSelected(mapFilterPrice);
      var room = window.util.searchValueSelected(mapFilterRooms);
      var guest = window.util.searchValueSelected(mapFilterGuests);

      var checkFeatures = function () {
        var featureStatus = true;
        for (var j = 0; j < featureElements.length; j++) {
          if (featureElements[j].checked && !offer.features.includes(featureElements[j].value)) {
            featureStatus = false;
            break;
          }
        }
        return featureStatus;
      };

      actualOffers = [];
      for (var i = 0; i < offers.length; i++) {
        var offer = offers[i].offer;

        if (offer.type === type || type === ANY_CHOICE) {
          if (offer.price >= PRICE_RANGES[price][INDEX_MIN_PRICE] && offer.price <= PRICE_RANGES[price][INDEX_MAX_PRICE]) {
            if (offer.rooms === +room || room === ANY_CHOICE) {
              if (offer.guests === +guest || guest === ANY_CHOICE) {
                if (checkFeatures()) {
                  actualOffers.push(offers[i]);
                  if (actualOffers.length === window.pin.MAX_COUNT) {
                    break;
                  }
                }
              }
            }
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


  var onTypeChange = window.debounce(function () {
    selectPins();
  });

  var onPriceChange = window.debounce(function () {
    selectPins();
  });

  var onRoomsChange = window.debounce(function () {
    selectPins();
  });

  var onGuestsChange = window.debounce(function () {
    selectPins();
  });

  var onFeaturesChange = window.debounce(function () {
    selectPins();
  });

  var activate = function () {
    window.util.changeDisabledElements(mapFilters.children, false);
    mapFilterType.addEventListener('change', onTypeChange);
    mapFilterPrice.addEventListener('change', onPriceChange);
    mapFilterRooms.addEventListener('change', onRoomsChange);
    mapFilterGuests.addEventListener('change', onGuestsChange);
    mapFilterFeatures.addEventListener('change', onFeaturesChange);
  };

  var disactivate = function () {
    window.util.changeDisabledElements(mapFilters.children, true);
    mapFilterType.removeEventListener('change', onTypeChange);
    mapFilterPrice.removeEventListener('change', onPriceChange);
    mapFilterRooms.removeEventListener('change', onRoomsChange);
    mapFilterGuests.removeEventListener('change', onGuestsChange);
    mapFilterFeatures.removeEventListener('change', onFeaturesChange);
  };

  window.filter = {
    getActualOffer: getActualOffer,
    receiveOffers: receiveOffers,
    disactivate: disactivate
  };

})();
