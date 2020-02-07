'use strict';

(function () {
  var nearbyPin = document.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var mapPinMain = document.querySelector('.map__pin--main');
  var address = document.querySelector('#address');
  var roomsSelector = adForm.querySelector('#room_number');
  var guestsSelector = adForm.querySelector('#capacity');
  var map = document.querySelector('.map');
  var mapElementsActivate = map.querySelector('.map__filters').children;
  var adFormElements = adForm.children;

  var changeDisabledElements = function (elements, disabledStatus) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = disabledStatus;
    }
  };

  var getAddressValue = function (elementX, elementY) {
    return elementX + ', ' + elementY;
  };


  var searchValueSelected = function (element) {
    var selectedIndex = element.options.selectedIndex;
    return element.options[selectedIndex].value;
  };


  var checkValidityRoomsGuests = function () {
    var selectedRoomsValue = +searchValueSelected(roomsSelector);
    var selectedGuestsValue = +searchValueSelected(guestsSelector);
    var statusValidity = selectedGuestsValue <= selectedRoomsValue && selectedRoomsValue <= window.data.MAX_COUNT_GUESTS && selectedGuestsValue > 0 || selectedRoomsValue === window.data.PALAS_COUNT_ROOMS && selectedGuestsValue === window.data.MIN_COUNT_GUESTS;
    var messageValidity = statusValidity ? '' : window.data.VALIDITY_MESSAGES[selectedRoomsValue] + '! Измените выбор количества гостей, или комнат!';
    guestsSelector.setCustomValidity(messageValidity);
  };

  var onRoomSelectorChange = function () {
    checkValidityRoomsGuests();
  };

  var onGuestSelectorChange = function () {
    checkValidityRoomsGuests();
  };

  var onPinClick = function (evt) {
    if (evt.button === 0) {
      activatePage();
    }
  };

  var onPinEnter = function (evt) {
    if (evt.key === window.data.ENTER_KEY) {
      activatePage();
    }
  };


  var activatePage = function () {
    adForm.classList.remove('ad-form--disabled');
    changeDisabledElements(adFormElements, false);
    changeDisabledElements(mapElementsActivate, false);
    map.classList.remove('map--faded');
    addressY += window.data.MAP_PIN_OFFSET_Y_ACTIVATION;
    address.defaultValue = getAddressValue(addressX, addressY);
    address.value = address.defaultValue;
    address.readOnly = true;
    checkValidityRoomsGuests();
    mapPinMain.removeEventListener('mousedown', onPinClick);
    mapPinMain.removeEventListener('keydown', onPinEnter);
    guestsSelector.addEventListener('change', onGuestSelectorChange);
    roomsSelector.addEventListener('change', onRoomSelectorChange);
    nearbyPin.appendChild(window.map.makePinBlock(window.data.offers));
  };

  // Начальное неактивное состояние
  changeDisabledElements(adFormElements, true);
  changeDisabledElements(mapElementsActivate, true);
  var addressX = Math.floor(+mapPinMain.style.left.split('px')[0] + window.data.MAP_PIN_OFFSET_X);
  var addressY = Math.floor(+mapPinMain.style.top.split('px')[0] + window.data.MAP_PIN_OFFSET_Y_NOT_ACTIVE);
  address.value = getAddressValue(addressX, addressY);
  mapPinMain.addEventListener('mousedown', onPinClick);
  mapPinMain.addEventListener('keydown', onPinEnter);
  // -------------------------------

})();
