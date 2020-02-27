'use strict';


(function () {

  var MAIN_PIN_OFFSET_X = 32;
  var MAIN_PIN_OFFSET_Y = 84;
  var MAP_PIN_OFFSET_X = 33;
  var MAP_PIN_OFFSET_Y_NOT_ACTIVE = 33;
  var MAP_PIN_OFFSET_Y_ACTIVATION = 48;
  var TIME_SHOW_ERROR = 3000;
  var MIN_X = 1;
  var MAX_X = 1200;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var ENTER_KEY = 'Enter';

  var main = document.querySelector('main');
  var map = document.querySelector('.map');
  var pinList = map.querySelector('.map__pins');
  var pinMain = map.querySelector('.map__pin--main');
  var address = document.querySelector('#address');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var addressX = Math.floor(+pinMain.style.left.split('px')[0] + MAP_PIN_OFFSET_X);
  var addressY = Math.floor(+pinMain.style.top.split('px')[0] + MAP_PIN_OFFSET_Y_NOT_ACTIVE);
  var defaultX = addressX;
  var defaultY = addressY + MAP_PIN_OFFSET_Y_ACTIVATION;
  var disabledPinMainStyle = pinMain.style.cssText;
  address.defaultValue = defaultX + ',' + defaultY;
  address.readOnly = true;

  var onSuccessLoad = function (elements) {
    window.filter.receiveOffers(elements);
  };

  var onErrorLoad = function (message) {
    if (message) {
      var errorElement = errorTemplate.cloneNode(true);
      errorElement.querySelector('.error__button').remove();
      errorElement.firstElementChild.textContent = 'Объявления с сервера не загрузились! ' + message;
      main.appendChild(errorElement);
      setTimeout(function () {
        errorElement.remove();
      }, TIME_SHOW_ERROR);
    }
  };

  var putMainPin = function (x, y) {
    pinMain.style.left = x + 'px';
    pinMain.style.top = y + 'px';
    address.value = (x + MAIN_PIN_OFFSET_X) + ', ' + (y + MAIN_PIN_OFFSET_Y);
  };

  var onPinClick = function (evtClick) {
    window.card.open(evtClick.target);
  };

  var onPinKeydown = function (evtKeydown) {
    if (evtKeydown.key === ENTER_KEY) {
      window.card.open(evtKeydown.target);
    }
  };

  var onPinMainMousedown = function (evtDown) {
    evtDown.preventDefault();

    var startPosition = {
      x: evtDown.clientX,
      y: evtDown.clientY
    };

    pinMain.style.zIndex = '2';

    var onMouseMove = function (evtMove) {
      evtMove.preventDefault();

      var shift = {
        x: startPosition.x - evtMove.clientX,
        y: startPosition.y - evtMove.clientY
      };

      startPosition = {
        x: evtMove.clientX,
        y: evtMove.clientY
      };

      var newPosition = {
        x: pinMain.offsetLeft - shift.x,
        y: pinMain.offsetTop - shift.y
      };

      var statusX = newPosition.x >= MIN_X - MAIN_PIN_OFFSET_X && newPosition.x <= MAX_X - MAIN_PIN_OFFSET_X;
      var statusY = newPosition.y >= MIN_Y - MAIN_PIN_OFFSET_Y && newPosition.y <= MAX_Y - MAIN_PIN_OFFSET_Y;

      if (statusX && statusY) {
        putMainPin(newPosition.x, newPosition.y);
      }
    };

    var onMouseUp = function (evtUp) {
      evtUp.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      pinMain.style.zIndex = '';
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var onPinMainStartMousedown = function (evt) {
    if (evt.button === 0) {
      activate();
      window.form.activate();
    }
  };

  var onPinMainKeydown = function (evt) {
    if (evt.key === ENTER_KEY) {
      activate();
      window.form.activate();
    }
  };

  var activate = function () {
    map.classList.remove('map--faded');
    address.value = address.defaultValue;
    pinMain.removeEventListener('mousedown', onPinMainStartMousedown);
    pinMain.removeEventListener('keydown', onPinMainKeydown);
    window.request.load(onSuccessLoad, onErrorLoad);
    pinList.addEventListener('click', onPinClick);
    pinList.addEventListener('keydown', onPinKeydown);
    pinMain.addEventListener('mousedown', onPinMainMousedown);
  };

  var disactivate = function () {
    address.value = addressX + ',' + addressY;
    pinMain.addEventListener('mousedown', onPinMainStartMousedown);
    pinMain.addEventListener('keydown', onPinMainKeydown);
    map.classList.add('map--faded');
    pinMain.style.cssText = disabledPinMainStyle;
    pinList.removeEventListener('click', onPinClick);
    pinList.removeEventListener('keydown', onPinKeydown);
    pinMain.removeEventListener('mousedown', onPinMainMousedown);
    window.filter.disactivate();
  };

  disactivate();
  window.form.disactivate();

  window.map = {
    disactivate: disactivate
  };

})();
