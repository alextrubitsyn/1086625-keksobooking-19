'use strict';

(function () {
  var PRICE_LOW_MAX = 10000;
  var PRICE_MIDDLE_MIN = 10000;
  var PRICE_MIDDLE_MAX = 50000;
  var PRICE_HIGH_MIN = 50000;
  var offers = [];
  var actualOffers = [];
  var pinList = document.querySelector('.map__pins');
  var mapFilters = document.querySelector('.map__filters');
  var mapFilterType = mapFilters.querySelector('#housing-type');
  var mapFilterPrice = mapFilters.querySelector('#housing-price');
  var mapFilterRooms = mapFilters.querySelector('#housing-rooms');
  var mapFilterGuests = mapFilters.querySelector('#housing-guests');
  var wifi = mapFilters.querySelector('#filter-wifi');
  var dishwasher = mapFilters.querySelector('#filter-dishwasher');
  var parking = mapFilters.querySelector('#filter-parking');
  var washer = mapFilters.querySelector('#filter-washer');
  var elevator = mapFilters.querySelector('#filter-elevator');
  var conditioner = mapFilters.querySelector('#filter-conditioner');

  var selectPins = function () {
    if (offers.length > 0) {
      var type = window.util.searchValueSelected(mapFilterType);
      var price = window.util.searchValueSelected(mapFilterPrice);
      var room = window.util.searchValueSelected(mapFilterRooms);
      var guest = window.util.searchValueSelected(mapFilterGuests);
      actualOffers = [];
      for (var i = 0; i < offers.length; i++) {
        var statusType = offers[i].offer.type === type || type === 'any';
        if (price === 'low') {
          var statusPrice = offers[i].offer.price < PRICE_LOW_MAX;
        } else if (price === 'middle') {
          statusPrice = offers[i].offer.price >= PRICE_MIDDLE_MIN && offers[i].offer.price <= PRICE_MIDDLE_MAX;
        } else if (price === 'high') {
          statusPrice = offers[i].offer.price > PRICE_HIGH_MIN;
        } else {
          statusPrice = true;
        }
        var statusRooms = offers[i].offer.rooms === +room || room === 'any';
        var statusGuests = offers[i].offer.guests === +guest || guest === 'any';

        var features = offers[i].offer.features;
        var wifiStatus = !wifi.checked || features.includes('wifi');
        var dishwasherStatus = !dishwasher.checked || features.includes('dishwasher');
        var parkingStatus = !parking.checked || features.includes('parking');
        var washerStatus = !washer.checked || features.includes('washer');
        var elevatorStatus = !elevator.checked || features.includes('elevator');
        var conditionerStatus = !conditioner.checked || features.includes('conditioner');
        var featureStatus = wifiStatus && dishwasherStatus && parkingStatus && washerStatus && elevatorStatus && conditionerStatus;

        if (statusType && statusPrice && statusRooms && statusGuests && featureStatus) {
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
    window.debounce(selectPins)();
  };

  var onPriceChange = function () {
    window.debounce(selectPins)();

  };

  var onRoomsChange = function () {
    window.debounce(selectPins)();

  };

  var onGuestsChange = function () {
    window.debounce(selectPins)();

  };

  var onWIfiChange = function () {
    window.debounce(selectPins)();

  };

  var onDishwasherChange = function () {
    window.debounce(selectPins)();

  };

  var onParkingChange = function () {
    window.debounce(selectPins)();

  };

  var onWasherChange = function () {
    window.debounce(selectPins)();

  };

  var onElevatorChange = function () {
    window.debounce(selectPins)();

  };

  var onConditionerChange = function () {
    window.debounce(selectPins)();

  };

  var activate = function () {
    window.util.changeDisabledElements(mapFilters.children, false);
    mapFilterType.addEventListener('change', onTypeChange);
    mapFilterPrice.addEventListener('change', onPriceChange);
    mapFilterRooms.addEventListener('change', onRoomsChange);
    mapFilterGuests.addEventListener('change', onGuestsChange);
    wifi.addEventListener('change', onWIfiChange);
    dishwasher.addEventListener('change', onDishwasherChange);
    parking.addEventListener('change', onParkingChange);
    washer.addEventListener('change', onWasherChange);
    elevator.addEventListener('change', onElevatorChange);
    conditioner.addEventListener('change', onConditionerChange);
  };

  var disactivate = function () {
    window.util.changeDisabledElements(mapFilters.children, true);
    mapFilterType.removeEventListener('change', onTypeChange);
    mapFilterPrice.removeEventListener('change', onPriceChange);
    mapFilterRooms.removeEventListener('change', onRoomsChange);
    mapFilterGuests.removeEventListener('change', onGuestsChange);
    wifi.removeEventListener('change', onWIfiChange);
    dishwasher.removeEventListener('change', onDishwasherChange);
    parking.removeEventListener('change', onParkingChange);
    washer.removeEventListener('change', onWasherChange);
    elevator.removeEventListener('change', onElevatorChange);
    conditioner.removeEventListener('change', onConditionerChange);

  };

  window.filter = {
    getActualOffer: getActualOffer,
    receiveOffers: receiveOffers,
    disactivate: disactivate
  };

})();
