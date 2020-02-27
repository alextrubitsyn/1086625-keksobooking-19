'use strict';

(function () {
  var MAX_COUNT_PINS = 5;
  var BORDER_PRICES_LOW_MIDDLE = 10000;
  var BORDER_PRICES_MIDDLE_HIGH = 50000;
  var STATUS_PRICE = {
    'any': function (price) {
      return price > 0;
    },
    'low': function (price) {
      return price < BORDER_PRICES_LOW_MIDDLE;
    },
    'middle': function (price) {
      return price >= BORDER_PRICES_LOW_MIDDLE && price <= BORDER_PRICES_MIDDLE_HIGH;
    },
    'high': function (price) {
      return price > BORDER_PRICES_MIDDLE_HIGH;
    }
  };
  var ANY_CHOICE = 'any';
  var offers = [];
  var actualOffers = [];
  var pinList = document.querySelector('.map__pins');
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersAny = mapFilters.querySelectorAll('option[value = "any"]');
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
          if (STATUS_PRICE[price](offer.price)) {
            if (offer.rooms === +room || room === ANY_CHOICE) {
              if (offer.guests === +guest || guest === ANY_CHOICE) {
                if (checkFeatures()) {
                  actualOffers.push(offers[i]);
                  if (actualOffers.length >= MAX_COUNT_PINS) {
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

  var onFiltersChange = window.debounce(function () {
    selectPins();
  });

  var activate = function () {
    window.util.changeDisabledElements(mapFilters.children, false);
    mapFilters.addEventListener('change', onFiltersChange);
  };

  var disactivate = function () {
    mapFiltersAny.forEach(function (option) {
      option.selected = true;
    });
    featureElements.forEach(function (option) {
      option.checked = false;
    });
    window.util.changeDisabledElements(mapFilters.children, true);
    mapFilterFeatures.removeEventListener('change', onFiltersChange);
  };

  window.filter = {
    getActualOffer: getActualOffer,
    receiveOffers: receiveOffers,
    disactivate: disactivate
  };

})();
