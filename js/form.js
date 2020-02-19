'use strict';

(function () {

  var MIN_TITLE = 30;
  var MAX_TITLE = 100;
  var MAX_PRICE = 1000000;

  var VALIDITY_MESSAGES_GUESTS = {
    1: 'В 1 комнате возможно проживание только 1 гостя',
    2: 'В 2 комнатах возможно проживание 1 или 2 гостей',
    3: 'В 3 комнатах возможно проживание 1, 2 или 3 гостей',
    100: '100 комнат не для гостей'
  };
  var VALIDITY_MESSAGES_PRICE = {
    'bungalo': 'Минимальная цена за ночь для бунгало - 0',
    'flat': 'Минимальная цена за ночь для квартиры - 1 000',
    'house': 'Минимальная цена за ночь для дома - 5 000',
    'palace': 'Минимальная цена за ночь для дворца - 10 000'
  };
  var MIN_PRICE_TYPE = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000'
  };
  var successElement;
  var errorElement;
  var errorClose;

  var makeBorder = function (element, status) {
    element.style.cssText = status ? '' : 'border: 3px solid red';
  };

  var showValidity = function (element, message) {
    element.setCustomValidity(message);
    if (!element.validity.valid) {
      element.reportValidity();
    } else {
      makeBorder(element, true);
    }
  };

  var checkValidityTitle = function () {
    var lengthTitle = window.data.titleInput.value.length;
    var messageValidity = '';
    if (lengthTitle === 0) {
      messageValidity = 'Заполните это поле, оно обязательное';
    } else if (lengthTitle > 0 && lengthTitle < MIN_TITLE) {
      messageValidity = 'Заголовок должен состоять минимум из 30 символов, сейчас ' + lengthTitle;
    } else if (lengthTitle > MAX_TITLE) {
      messageValidity = 'Заголовок не должен превышать 100 символов';
    } else {
      messageValidity = '';
    }
    showValidity(window.data.titleInput, messageValidity);
  };

  var checkValidityGuests = function () {
    var selectedRooms = +window.util.searchValueSelected(window.data.roomsSelector);
    var selectedGuests = +window.util.searchValueSelected(window.data.guestsSelector);
    var statusValidity = selectedGuests <= selectedRooms && selectedRooms <= window.data.MAX_COUNT_GUESTS && selectedGuests > 0 || selectedRooms === window.data.PALAS_COUNT_ROOMS && selectedGuests === window.data.MIN_COUNT_GUESTS;
    var messageValidity = statusValidity ? '' : VALIDITY_MESSAGES_GUESTS[selectedRooms] + '! Измените выбор количества гостей, или комнат!';
    showValidity(window.data.guestsSelector, messageValidity);
  };

  var changeTimeIn = function (index) {
    window.data.timeInSelector.selectedIndex = index;
  };

  var changeTimeOut = function (index) {
    window.data.timeOutSelector.selectedIndex = index;
  };

  var checkValidityPrice = function () {
    var price = +window.data.priceInput.value;
    var selectedType = window.util.searchValueSelected(window.data.typeSelector);
    var messageValidity = price >= MIN_PRICE_TYPE[selectedType] ? '' : VALIDITY_MESSAGES_PRICE[selectedType] + '! Измените выбор жилья, или цену за ночь!';
    if (price > MAX_PRICE) {
      messageValidity = 'Максимальная цена - ' + MAX_PRICE + '! Измените цену за ночь!';
    }
    showValidity(window.data.priceInput, messageValidity);
  };

  var onTitleInput = function () {
    checkValidityTitle();
  };

  var onTypeChange = function (evtType) {
    window.data.priceInput.placeholder = MIN_PRICE_TYPE[evtType.target.value];
    checkValidityPrice();
  };

  var onPriceInput = function () {
    checkValidityPrice();
  };

  var onRoomsChange = function () {
    checkValidityGuests();
  };

  var onGuestsChange = function () {
    checkValidityGuests();
  };

  var onTimeInChange = function (evtIn) {
    changeTimeOut(evtIn.target.selectedIndex);
  };

  var onTimeOutChange = function (evtOut) {
    changeTimeIn(evtOut.target.selectedIndex);
  };

  var returnStartPage = function () {
    if (successElement) {
      successElement.remove();
      successElement = '';
    }
    window.pin.erase();
    if (window.data.cardOffer) {
      window.data.closeListeners();
      window.data.cardOffer.remove();
    }
    document.removeEventListener('keydown', onSuccessKeydown);
    document.removeEventListener('click', onSuccessClick);
    window.data.adForm.reset();
    window.data.adForm.removeEventListener('submit', onFormSubmit);
    window.data.adForm.removeEventListener('reset', onFormReset);
    window.data.titleInput.removeEventListener('input', onTitleInput);
    window.data.priceInput.removeEventListener('input', onPriceInput);
    window.data.typeSelector.removeEventListener('change', onTypeChange);
    window.data.guestsSelector.removeEventListener('change', onGuestsChange);
    window.data.roomsSelector.removeEventListener('change', onRoomsChange);
    window.data.timeInSelector.removeEventListener('change', onTimeInChange);
    window.data.timeOutSelector.removeEventListener('change', onTimeOutChange);
    window.start.disablePage();
    window.data.adForm.classList.add('ad-form--disabled');
    window.data.map.classList.add('map--faded');
    window.data.pinMain.style.cssText = window.start.disabledPinMainStyle;
  };

  var onSuccessKeydown = function (evtCloseSuccess) {
    if (evtCloseSuccess.key === window.data.ESC_KEY) {
      returnStartPage();
    }
  };

  var onSuccessClick = function (evtSuccess) {
    var successMessage = successElement.querySelector('.success__message');
    if (evtSuccess.target !== successMessage) {
      returnStartPage();
    }
  };

  var onLoad = function (answer) {
    if (answer) {
      successElement = window.data.successTemplate.cloneNode(true);
      window.data.main.appendChild(successElement);
      document.addEventListener('keydown', onSuccessKeydown);
      document.addEventListener('click', onSuccessClick);
    }
  };

  var cancelError = function () {
    if (errorElement) {
      document.removeEventListener('keydown', onErrorKeydown);
      document.removeEventListener('click', onErrorClick);
      errorClose.removeEventListener('keydown', onErrorButtonKeydown);
      errorClose.removeEventListener('click', onErrorButtonClick);
      errorElement.remove();
    }
  };

  var onErrorKeydown = function (evtCloseError) {
    if (evtCloseError.key === window.data.ESC_KEY) {
      cancelError();
    }
  };

  var onErrorClick = function (evtError) {
    var errorMessage = errorElement.querySelector('.error__message');
    if (evtError.target !== errorMessage) {
      cancelError();
    }
  };

  var onErrorButtonKeydown = function (evtCloseButtonError) {
    if (evtCloseButtonError.key === window.data.ENTER) {
      cancelError();
    }
  };

  var onErrorButtonClick = function () {
    cancelError();
  };

  var onError = function (message) {
    if (message) {
      errorElement = window.data.errorTemplate.cloneNode(true);
      window.data.main.appendChild(errorElement);
      errorClose = errorElement.querySelector('.error__button');
      errorClose.addEventListener('keydown', onErrorButtonKeydown);
      errorClose.addEventListener('click', onErrorButtonClick);
      document.addEventListener('keydown', onErrorKeydown);
      document.addEventListener('click', onErrorClick);
    }
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    checkValidityTitle();
    checkValidityPrice();
    checkValidityGuests();
    makeBorder(window.data.titleInput, window.data.titleInput.validity.valid);
    makeBorder(window.data.guestsSelector, window.data.guestsSelector.validity.valid);
    makeBorder(window.data.priceInput, window.data.priceInput.validity.valid);
    if (!window.data.priceInput.value) {
      window.data.priceInput.value = 0;
      checkValidityPrice(0);
    }
    if (!window.data.titleInput.validity.valid) {
      window.data.titleInput.reportValidity();
    } else if (!window.data.priceInput.validity.valid) {
      window.data.priceInput.reportValidity();
    } else if (!window.data.guestsSelector.validity.valid) {
      window.data.guestsSelector.reportValidity();
    } else {
      window.request.save(new FormData(window.data.adForm), onLoad, onError);
    }
  };

  var onFormReset = function () {
    returnStartPage();
  };

  window.form = {
    onFormSubmit: onFormSubmit,
    onFormReset: onFormReset,
    onTitleInput: onTitleInput,
    onTypeChange: onTypeChange,
    onPriceInput: onPriceInput,
    onRoomsChange: onRoomsChange,
    onGuestsChange: onGuestsChange,
    onTimeInChange: onTimeInChange,
    onTimeOutChange: onTimeOutChange
  };

})();
