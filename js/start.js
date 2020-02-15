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
  var fragmentCards = document.createDocumentFragment();
  var offers = [];

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
    address.defaultValue = getAddressValue(defaultX, defaultY);
    address.value = address.defaultValue;
    address.readOnly = true;
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
    window.request.load(onSuccess, onError);
  };


  var onSuccess = function (elements) {
    window.start.offers = elements;
    nearbyPin.appendChild(window.pin.makeBlock(elements));
  };

  var onError = function () {
  };

  // Начальное неактивное состояние
  changeDisabledElements(adFormElements, true);
  changeDisabledElements(mapElementsActivate, true);
  var addressX = Math.floor(+pinMain.style.left.split('px')[0] + MAP_PIN_OFFSET_X);
  var addressY = Math.floor(+pinMain.style.top.split('px')[0] + MAP_PIN_OFFSET_Y_NOT_ACTIVE);
  address.value = getAddressValue(addressX, addressY);
  pinMain.addEventListener('mousedown', onPinMousedown);
  pinMain.addEventListener('keydown', onPinKeydown);
  var defaultX = addressX;
  var defaultY = addressY + MAP_PIN_OFFSET_Y_ACTIVATION;
  // -------------------------------

  window.start = {
    offers: offers,
    defaultX: defaultX,
    defaultY: defaultY,
    fragmentCards: fragmentCards
  };
})();
