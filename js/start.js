'use strict';

(function () {

  var MAP_PIN_OFFSET_X = 33;
  var MAP_PIN_OFFSET_Y_NOT_ACTIVE = 33;
  var MAP_PIN_OFFSET_Y_ACTIVATION = 48;
  var fragmentCards = document.createDocumentFragment();
  var TIME_SHOW_ERROR = 3000;

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
    window.data.adForm.classList.remove('ad-form--disabled');
    changeDisabledElements(window.data.adFormElements, false);
    window.data.map.classList.remove('map--faded');
    window.data.address.defaultValue = getAddressValue(defaultX, defaultY);
    window.data.address.value = window.data.address.defaultValue;
    window.data.address.readOnly = true;
    window.data.pinMain.removeEventListener('mousedown', onPinMousedown);
    window.data.pinMain.removeEventListener('keydown', onPinKeydown);
    window.data.adForm.addEventListener('submit', window.form.onFormSubmit);
    window.data.adForm.noValidate = true;
    window.data.adForm.addEventListener('reset', window.form.onFormReset);
    window.data.titleInput.addEventListener('input', window.form.onTitleInput);
    window.data.priceInput.addEventListener('input', window.form.onPriceInput);
    window.data.typeSelector.addEventListener('change', window.form.onTypeChange);
    window.data.guestsSelector.addEventListener('change', window.form.onGuestsChange);
    window.data.roomsSelector.addEventListener('change', window.form.onRoomsChange);
    window.data.timeInSelector.addEventListener('change', window.form.onTimeInChange);
    window.data.timeOutSelector.addEventListener('change', window.form.onTimeOutChange);
    window.request.load(onSuccess, onError);
  };


  var onSuccess = function (elements) {
    window.data.offers = elements;
    window.data.updateOffers = elements;
    changeDisabledElements(window.data.mapFilters.children, false);
    window.filter.selectPins();
    window.filter.start();
  };

  var onError = function (message) {
    if (message) {
      var errorElement = window.data.errorTemplate.cloneNode(true);
      errorElement.querySelector('.error__button').remove();
      errorElement.firstElementChild.textContent = 'Объявления с сервера не загрузились! ' + message;
      window.data.main.appendChild(errorElement);
      setTimeout(function () {
        errorElement.remove();
      }, TIME_SHOW_ERROR);
    }

  };

  var disablePage = function () {
    changeDisabledElements(window.data.adFormElements, true);
    changeDisabledElements(window.data.mapFilters.children, true);
    window.data.address.value = getAddressValue(addressX, addressY);
    window.data.pinMain.addEventListener('mousedown', onPinMousedown);
    window.data.pinMain.addEventListener('keydown', onPinKeydown);
  };

  var addressX = Math.floor(+window.data.pinMain.style.left.split('px')[0] + MAP_PIN_OFFSET_X);
  var addressY = Math.floor(+window.data.pinMain.style.top.split('px')[0] + MAP_PIN_OFFSET_Y_NOT_ACTIVE);
  var defaultX = addressX;
  var defaultY = addressY + MAP_PIN_OFFSET_Y_ACTIVATION;
  var disabledPinMainStyle = window.data.pinMain.style.cssText;
  disablePage();

  window.start = {
    defaultX: defaultX,
    defaultY: defaultY,
    disablePage: disablePage,
    fragmentCards: fragmentCards,
    disabledPinMainStyle: disabledPinMainStyle
  };
})();
