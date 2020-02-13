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

  var checkValidityTitle = function (title) {
    if (title === 0) {
      titleInput.setCustomValidity('Заполните это поле, оно обязательное');
    } else if (title > 0 && title < MIN_TITLE) {
      titleInput.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
    } else if (title > MAX_TITLE) {
      titleInput.setCustomValidity('Заголовок не должен превышать 100 символов');
    } else {
      titleInput.setCustomValidity('');
    }
    // console.log(titleInput, adForm.validity());
    makeBorder(titleInput, !titleInput.reportValidity);
    // titleInput.reportValidity();
  };

  var makeBorder = function (element, status) {
    element.style.cssText = status ? '' : 'border: 3px solid red';
  };

  var checkValidityGuests = function () {
    var selectedRooms = +searchValueSelected(roomsSelector);
    var selectedGuests = +searchValueSelected(guestsSelector);
    var statusValidity = selectedGuests <= selectedRooms && selectedRooms <= window.data.MAX_COUNT_GUESTS && selectedGuests > 0 || selectedRooms === PALAS_COUNT_ROOMS && selectedGuests === window.data.MIN_COUNT_GUESTS;
    var messageValidity = statusValidity ? '' : VALIDITY_MESSAGES_GUESTS[selectedRooms] + '! Измените выбор количества гостей, или комнат!';
    makeBorder(guestsSelector, statusValidity);
    guestsSelector.setCustomValidity(messageValidity);
  };

  var changeTimeIn = function (index) {
    timeInSelector.selectedIndex = index;
  };

  var changeTimeOut = function (index) {
    timeOutSelector.selectedIndex = index;
  };

  var checkValidityPrice = function (price) {
    var selectedType = searchValueSelected(typeSelector);
    var statusValidity = selectedType === 'bungalo' && price >= 0 || selectedType === 'flat' && price >= 1000 || selectedType === 'house' && price >= 5000 || selectedType === 'palace' && price >= 10000;
    var messageValidity = statusValidity ? '' : VALIDITY_MESSAGES_PRICE[selectedType] + '! Измените выбор жилья, или цену за ночь!';
    if (price > 1000000) {
      messageValidity = 'Максимальная цена - 1000000! Измените цену за ночь!';
    }
    makeBorder(priceInput, statusValidity);
    priceInput.setCustomValidity(messageValidity);
  };

  var onTitleInput = function (evtTitle) {
    checkValidityTitle(evtTitle.target.value);
  };

  var onTypeChange = function () {
    checkValidityPrice(priceInput.value);
  };

  var onPriceInput = function (evtPrice) {
    checkValidityTitle(evtPrice.target.value);
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

  var onFormSubmit = function (evt) {
    evt.preventDefault();

  };

  var onFormReset = function () {
    checkValidityTitle(titleInput.defaultValue);
    checkValidityPrice(priceInput.defaultValue);
    checkValidityGuests();
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
    onTimeOutChange: onTimeOutChange,
    checkValidityRoomsGuests: checkValidityGuests,
    checkValidityPrice: checkValidityPrice,
    checkValidityTitle: checkValidityTitle
  };

})();
