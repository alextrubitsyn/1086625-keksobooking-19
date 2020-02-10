'use strict';

(function () {

  var PALAS_COUNT_ROOMS = 100;
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


  var searchValueSelected = function (element) {
    var selectedIndex = element.options.selectedIndex;
    return element.options[selectedIndex].value;
  };

  var checkValidityTitle = function () {
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity('Заголовок не должен превышать 100 символов');
    } else if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Обязательное поле');
    } else {
      titleInput.setCustomValidity('');
    }
  };

  var makeBorder = function (element, status) {
    element.style.cssText = status ? '' : 'border: 1px solid red';
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

  var onTitleChange = function () {
    checkValidityTitle();
  };

  var onTypeChange = function () {
    checkValidityPrice(priceInput.value);
  };

  var onPriceChange = function (evtPrice) {
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

  window.form = {
    onFormSubmit: onFormSubmit,
    onTitleChange: onTitleChange,
    onTypeChange: onTypeChange,
    onPriceChange: onPriceChange,
    onRoomsChange: onRoomsChange,
    onGuestsChange: onGuestsChange,
    onTimeInChange: onTimeInChange,
    onTimeOutChange: onTimeOutChange,
    checkValidityRoomsGuests: checkValidityGuests,
    checkValidityPrice: checkValidityPrice,
    checkValidityTitle: checkValidityTitle
  };

})();
