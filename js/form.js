'use strict';

(function () {

  var MIN_TITLE = 30;
  var MAX_TITLE = 100;
  var MAX_PRICE = 1000000;
  var MIN_COUNT_GUESTS = 0;
  var MAX_COUNT_GUESTS = 3;
  var PALAS_COUNT_ROOMS = 100;
  var ESC_KEY = 'Escape';
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

  var main = document.querySelector('main');
  var adForm = document.querySelector('.ad-form');
  var titleInput = adForm.querySelector('#title');
  var typeSelector = adForm.querySelector('#type');
  var roomsSelector = adForm.querySelector('#room_number');
  var guestsSelector = adForm.querySelector('#capacity');
  var timeInSelector = adForm.querySelector('#timein');
  var timeOutSelector = adForm.querySelector('#timeout');
  var priceInput = adForm.querySelector('#price');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var adFormElements = adForm.children;

  var activate = function () {
    adForm.classList.remove('ad-form--disabled');
    window.util.changeDisabledElements(adFormElements, false);
    adForm.addEventListener('submit', onFormSubmit);
    adForm.noValidate = true;
    adForm.addEventListener('reset', onFormReset);
    titleInput.addEventListener('input', onTitleInput);
    priceInput.addEventListener('input', onPriceInput);
    typeSelector.addEventListener('change', onTypeChange);
    guestsSelector.addEventListener('change', onGuestsChange);
    roomsSelector.addEventListener('change', onRoomsChange);
    timeInSelector.addEventListener('change', onTimeInChange);
    timeOutSelector.addEventListener('change', onTimeOutChange);
    window.photos.activate();
  };


  var disactivate = function () {
    window.util.changeDisabledElements(adFormElements, true);
    window.photos.disactivate();
  };

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
    var lengthTitle = titleInput.value.length;
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
    showValidity(titleInput, messageValidity);
  };

  var checkValidityGuests = function () {
    var selectedRooms = +window.util.searchValueSelected(roomsSelector);
    var selectedGuests = +window.util.searchValueSelected(guestsSelector);
    var statusValidity = selectedGuests <= selectedRooms && selectedRooms <= MAX_COUNT_GUESTS && selectedGuests > 0 || selectedRooms === PALAS_COUNT_ROOMS && selectedGuests === MIN_COUNT_GUESTS;
    var messageValidity = statusValidity ? '' : VALIDITY_MESSAGES_GUESTS[selectedRooms] + '! Измените выбор количества гостей, или комнат!';
    showValidity(guestsSelector, messageValidity);
  };

  var changeTimeIn = function (index) {
    timeInSelector.selectedIndex = index;
  };

  var changeTimeOut = function (index) {
    timeOutSelector.selectedIndex = index;
  };

  var checkValidityPrice = function () {
    var price = +priceInput.value;
    var selectedType = window.util.searchValueSelected(typeSelector);
    var messageValidity = price >= MIN_PRICE_TYPE[selectedType] ? '' : VALIDITY_MESSAGES_PRICE[selectedType] + '! Измените выбор жилья, или цену за ночь!';
    if (price > MAX_PRICE) {
      messageValidity = 'Максимальная цена - ' + MAX_PRICE + '! Измените цену за ночь!';
    }
    showValidity(priceInput, messageValidity);
  };

  var onTitleInput = function () {
    checkValidityTitle();
  };

  var onTypeChange = function (evtType) {
    priceInput.placeholder = MIN_PRICE_TYPE[evtType.target.value];
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
    window.card.close();
    window.pin.erase();
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

    window.map.disactivate();
    disactivate();

    setTimeout(function () {
      priceInput.placeholder = MIN_PRICE_TYPE[window.util.searchValueSelected(typeSelector)];
    }, 1);

    adForm.classList.add('ad-form--disabled');
  };

  var onSuccessKeydown = function (evtCloseSuccess) {
    if (evtCloseSuccess.key === ESC_KEY) {
      returnStartPage();
    }
  };

  var onSuccessClick = function (evtSuccess) {
    var successMessage = successElement.querySelector('.success__message');
    if (evtSuccess.target !== successMessage) {
      returnStartPage();
    }
  };

  var onSuccessSave = function (answer) {
    if (answer) {
      successElement = successTemplate.cloneNode(true);
      main.appendChild(successElement);
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
    if (evtCloseError.key === ESC_KEY) {
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

  var onErrorSave = function (message) {
    if (message) {
      errorElement = errorTemplate.cloneNode(true);
      main.appendChild(errorElement);
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
      window.request.save(new FormData(adForm), onSuccessSave, onErrorSave);
    }
  };

  var onFormReset = function () {
    returnStartPage();
  };

  window.form = {
    activate: activate,
    disactivate: disactivate
  };

})();
