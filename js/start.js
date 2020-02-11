'use strict';

(function () {

  var MAP_PIN_OFFSET_X = 33;
  var MAP_PIN_OFFSET_Y_NOT_ACTIVE = 33;
  var MAP_PIN_OFFSET_Y_ACTIVATION = 48;
  var nearbyPin = document.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var pinMain = document.querySelector('.map__pin--main');
  var address = document.querySelector('#address');
  var titleInput = adForm.querySelector('#title');
  var typeSelector = adForm.querySelector('#type');
  var roomsSelector = adForm.querySelector('#room_number');
  var guestsSelector = adForm.querySelector('#capacity');
  var timeInSelector = adForm.querySelector('#timein');
  var timeOutSelector = adForm.querySelector('#timeout');
  var priceInput = adForm.querySelector('#price');
  var map = document.querySelector('.map');
  var mapElementsActivate = map.querySelector('.map__filters').children;
  var adFormElements = adForm.children;

  var changeDisabledElements = function (elements, disabledStatus) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = disabledStatus;
    }
  };


  var onPinMousedown = function (evt) {
    if (evt.button === 0) {
      activatePage();
    }
  };

  var onPinKeydown = function (evt) {
    if (evt.key === window.data.ENTER_KEY) {
      activatePage();
    }
  };

  var getAddressValue = function (elementX, elementY) {
    return elementX + ', ' + elementY;
  };

  var activatePage = function () {
    adForm.classList.remove('ad-form--disabled');
    changeDisabledElements(adFormElements, false);
    changeDisabledElements(mapElementsActivate, false);
    map.classList.remove('map--faded');
    address.defaultValue = getAddressValue(DEFAULT_X, DEFAULT_Y);
    address.value = address.defaultValue;
    address.readOnly = true;
    window.form.checkValidityTitle('');
    window.form.checkValidityPrice(0);
    window.form.checkValidityRoomsGuests();
    pinMain.removeEventListener('mousedown', onPinMousedown);
    pinMain.removeEventListener('keydown', onPinKeydown);
    adForm.addEventListener('submit', window.form.onFormSubmit);
    adForm.noValidate = true;
    adForm.addEventListener('reset', window.form.onFormReset);
    titleInput.addEventListener('input', window.form.onTitleInput);
    priceInput.addEventListener('input', window.form.onPriceInput);
    typeSelector.addEventListener('change', window.form.onTypeChange);
    guestsSelector.addEventListener('change', window.form.onGuestsChange);
    roomsSelector.addEventListener('change', window.form.onRoomsChange);
    timeInSelector.addEventListener('change', window.form.onTimeInChange);
    timeOutSelector.addEventListener('change', window.form.onTimeOutChange);
    nearbyPin.appendChild(window.pin.makeBlock(window.data.offers));
  };

  // Начальное неактивное состояние
  changeDisabledElements(adFormElements, true);
  changeDisabledElements(mapElementsActivate, true);
  var addressX = Math.floor(+pinMain.style.left.split('px')[0] + MAP_PIN_OFFSET_X);
  var addressY = Math.floor(+pinMain.style.top.split('px')[0] + MAP_PIN_OFFSET_Y_NOT_ACTIVE);
  address.value = getAddressValue(addressX, addressY);
  pinMain.addEventListener('mousedown', onPinMousedown);
  pinMain.addEventListener('keydown', onPinKeydown);
  var DEFAULT_X = addressX;
  var DEFAULT_Y = addressY + MAP_PIN_OFFSET_Y_ACTIVATION;
  // -------------------------------

  window.start = {
    DEFAULT_X: DEFAULT_X,
    DEFAULT_Y: DEFAULT_Y
  };
})();
