'use strict';

(function () {

  var PALAS_COUNT_ROOMS = 100;
  var MIN_TITLE = 30;
  var MAX_TITLE = 100;
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
  var main = document.querySelector('main');
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var titleInput = adForm.querySelector('#title');
  var roomsSelector = adForm.querySelector('#room_number');
  var guestsSelector = adForm.querySelector('#capacity');
  var typeSelector = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('#price');
  var timeInSelector = adForm.querySelector('#timein');
  var timeOutSelector = adForm.querySelector('#timeout');
  var address = document.querySelector('#address');


  var searchValueSelected = function (element) {
    var selectedIndex = element.options.selectedIndex;
    return element.options[selectedIndex].value;
  };

  var checkValidityTitle = function () {
    var lengthTitle = titleInput.value.length;
    if (lengthTitle === 0) {
      titleInput.setCustomValidity('Заполните это поле, оно обязательное');
    } else if (lengthTitle > 0 && lengthTitle < MIN_TITLE) {
      titleInput.setCustomValidity('Заголовок должен состоять минимум из 30 символов, сейчас ' + lengthTitle);
    } else if (lengthTitle > MAX_TITLE) {
      titleInput.setCustomValidity('Заголовок не должен превышать 100 символов');
    } else {
      titleInput.setCustomValidity('');
    }
    if (!titleInput.validity.valid) {
      titleInput.reportValidity();
    } else {
      makeBorder(titleInput, true);
    }
  };

  var makeBorder = function (element, status) {
    element.style.cssText = status ? '' : 'border: 3px solid red';
  };

  var checkValidityGuests = function () {
    var selectedRooms = +searchValueSelected(roomsSelector);
    var selectedGuests = +searchValueSelected(guestsSelector);
    var statusValidity = selectedGuests <= selectedRooms && selectedRooms <= window.data.MAX_COUNT_GUESTS && selectedGuests > 0 || selectedRooms === PALAS_COUNT_ROOMS && selectedGuests === window.data.MIN_COUNT_GUESTS;
    var messageValidity = statusValidity ? '' : VALIDITY_MESSAGES_GUESTS[selectedRooms] + '! Измените выбор количества гостей, или комнат!';
    guestsSelector.setCustomValidity(messageValidity);
    if (!guestsSelector.validity.valid) {
      guestsSelector.reportValidity();
    } else {
      makeBorder(guestsSelector, true);
    }
  };

  var changeTimeIn = function (index) {
    timeInSelector.selectedIndex = index;
  };

  var changeTimeOut = function (index) {
    timeOutSelector.selectedIndex = index;
  };

  var checkValidityPrice = function () {
    var price = +priceInput.value;
    var selectedType = searchValueSelected(typeSelector);
    var statusValidity = selectedType === 'bungalo' && price >= 0 || selectedType === 'flat' && price >= 1000 || selectedType === 'house' && price >= 5000 || selectedType === 'palace' && price >= 10000;
    var messageValidity = statusValidity ? '' : VALIDITY_MESSAGES_PRICE[selectedType] + '! Измените выбор жилья, или цену за ночь!';
    if (price > 1000000) {
      messageValidity = 'Максимальная цена - 1000000! Измените цену за ночь!';
    }
    priceInput.setCustomValidity(messageValidity);
    if (!priceInput.validity.valid) {
      priceInput.reportValidity();
    } else {
      makeBorder(priceInput, true);
    }
  };

  var onTitleInput = function () {
    checkValidityTitle();
  };

  var onTypeChange = function () {
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
    window.util.eraseElement('.success');
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
    document.removeEventListener('keydown', onSuccessKeydown);
    document.removeEventListener('click', onSuccessClick);
    adForm.reset();
    adForm.removeEventListener('submit', onFormSubmit);
    adForm.removeEventListener('reset', onFormReset);
    titleInput.removeEventListener('input', onTitleInput);
    priceInput.removeEventListener('input', onPriceInput);
    typeSelector.removeEventListener('change', onTypeChange);
    guestsSelector.removeEventListener('change', onGuestsChange);
    roomsSelector.removeEventListener('change', onRoomsChange);
    timeInSelector.removeEventListener('change', onTimeInChange);
    timeOutSelector.removeEventListener('change', onTimeOutChange);
    window.start.disablePage();
    adForm.classList.add('ad-form--disabled');
    map.classList.add('map--faded');
    pinMain.style.cssText = window.start.disabledPinMainStyle;
  };

  var onSuccessKeydown = function (evtCloseSuccess) {
    if (evtCloseSuccess.key === window.data.ESC_KEY) {
      returnStartPage();
    }
  };

  var onSuccessClick = function () {
    returnStartPage();
  };

  var onLoad = function (answer) {
    if (answer) {
      var successTemplate = document.querySelector('#success').content.querySelector('.success');
      var successElement = successTemplate.cloneNode(true);
      main.appendChild(successElement);
      document.addEventListener('keydown', onSuccessKeydown);
      document.addEventListener('click', onSuccessClick);
    }
  };

  var cancelError = function () {
    window.util.eraseElement('.error');
    document.removeEventListener('keydown', onErrorKeydown);
    document.removeEventListener('click', onErrorClick);
    document.removeEventListener('keydown', onErrorButtonKeydown);
    document.removeEventListener('click', onErrorButtonClick);
  };

  var onErrorKeydown = function (evtCloseError) {
    if (evtCloseError.key === window.data.ESC_KEY) {
      cancelError();
    }
  };

  var onErrorClick = function () {
    cancelError();
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
      var errorTemplate = document.querySelector('#error').content.querySelector('.error');
      var errorElement = errorTemplate.cloneNode(true);
      main.appendChild(errorElement);
      var errorClose = document.querySelector('.error__button');

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
    makeBorder(titleInput, titleInput.validity.valid);
    makeBorder(guestsSelector, guestsSelector.validity.valid);
    makeBorder(priceInput, priceInput.validity.valid);
    if (!priceInput.value) {
      priceInput.value = 0;
      checkValidityPrice(0);
    }
    if (!titleInput.validity.valid) {
      titleInput.reportValidity();
    } else if (!priceInput.validity.valid) {
      priceInput.reportValidity();
    } else if (!guestsSelector.validity.valid) {
      guestsSelector.reportValidity();
    } else {
      window.request.save(new FormData(adForm), onLoad, onError);
    }
  };

  var onFormReset = function () {
    checkValidityTitle(titleInput.defaultValue);
    checkValidityPrice(priceInput.defaultValue);
    checkValidityGuests();
    makeBorder(titleInput, true);
    makeBorder(guestsSelector, true);
    makeBorder(priceInput, true);
    var x = address.defaultValue.split(', ')[0];
    var y = address.defaultValue.split(', ')[1];
    window.map.putMainPin(x, y);
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
    // checkValidityRoomsGuests: checkValidityGuests,
    // checkValidityPrice: checkValidityPrice,
    // checkValidityTitle: checkValidityTitle
  };

})();
