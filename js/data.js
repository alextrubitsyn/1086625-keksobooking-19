'use strict';

(function () {
  var main = document.querySelector('main');
  var map = document.querySelector('.map');
  var filtersBlock = document.querySelector('.map__filters-container');
  var mapElementsActivate = filtersBlock.querySelector('.map__filters').children;
  var nearbyPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var pinList = map.querySelector('.map__pins');
  var pinMain = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var address = document.querySelector('#address');
  var titleInput = adForm.querySelector('#title');
  var typeSelector = adForm.querySelector('#type');
  var roomsSelector = adForm.querySelector('#room_number');
  var guestsSelector = adForm.querySelector('#capacity');
  var timeInSelector = adForm.querySelector('#timein');
  var timeOutSelector = adForm.querySelector('#timeout');
  var priceInput = adForm.querySelector('#price');
  var adFormElements = adForm.children;
  var MIN_X = 1;
  var MAX_X = 1200;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var MIN_COUNT_GUESTS = 0;
  var MAX_COUNT_GUESTS = 3;
  var PALAS_COUNT_ROOMS = 100;
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';
  var cardOffer;

  var closeListeners = function () { };


  window.data = {
    main: main,
    map: map,
    filtersBlock: filtersBlock,
    mapElementsActivate: mapElementsActivate,
    nearbyPinTemplate: nearbyPinTemplate,
    cardTemplate: cardTemplate,
    errorTemplate: errorTemplate,
    successTemplate: successTemplate,
    pinList: pinList,
    pinMain: pinMain,
    adForm: adForm,
    address: address,
    titleInput: titleInput,
    typeSelector: typeSelector,
    roomsSelector: roomsSelector,
    guestsSelector: guestsSelector,
    timeInSelector: timeInSelector,
    timeOutSelector: timeOutSelector,
    priceInput: priceInput,
    adFormElements: adFormElements,
    MIN_X: MIN_X,
    MAX_X: MAX_X,
    MIN_Y: MIN_Y,
    MAX_Y: MAX_Y,
    MIN_COUNT_GUESTS: MIN_COUNT_GUESTS,
    MAX_COUNT_GUESTS: MAX_COUNT_GUESTS,
    PALAS_COUNT_ROOMS: PALAS_COUNT_ROOMS,
    ESC_KEY: ESC_KEY,
    ENTER_KEY: ENTER_KEY,
    cardOffer: cardOffer,
    closeListeners: closeListeners
  };

})();
