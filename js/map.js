'use strict';


(function () {

  var MAIN_PIN_OFFSET_X = 32;
  var MAIN_PIN_OFFSET_Y = 84;
  var CORRECT_INDEX_PIN = 2;
  var pinList = document.querySelector('.map__pins');
  var pinMain = pinList.querySelector('.map__pin--main');
  var address = document.querySelector('#address');

  var putMainPin = function (x, y) {
    pinMain.style.left = x + 'px';
    pinMain.style.top = y + 'px';
    address.value = (x + MAIN_PIN_OFFSET_X) + ', ' + (y + MAIN_PIN_OFFSET_Y);
  };

  var openCard = function (target) {
    var pinCheck = target.className === 'map__pin' || target.parentNode.className === 'map__pin';
    var pinMainCheck = target.className === 'map__pin--main' || target.parentNode.className === 'map__pin--main';

    var removeCardListener = function () {
      cardClose.removeEventListener('click', onCloseClick);
      cardClose.removeEventListener('keydown', onCloseKeydown);
      document.removeEventListener('keydown', onEscapeKeydown);
    };

    if (pinCheck && !pinMainCheck) {
      if (!target.className) {
        target = target.parentElement;
      }
      var index = Array.prototype.indexOf.call(target.parentNode.children, target) - CORRECT_INDEX_PIN;
      var offer = window.start.offers[index];
    }

    window.util.eraseElement('.map__card');

    if (offer) {
      var card = window.card.render(offer);
      document.querySelector('.map__filters-container').before(card);
    }

    var onCloseClick = function () {
      removeCardListener();
      window.util.eraseElement('.map__card');

    };

    var onCloseKeydown = function (evtClose) {
      if (evtClose.key === window.data.ENTER_KEY) {
        removeCardListener();
        window.util.eraseElement('.map__card');

      }
    };

    var onEscapeKeydown = function (evtEscape) {
      if (evtEscape.key === window.data.ESC_KEY) {
        removeCardListener();
        window.util.eraseElement('.map__card');

      }
    };

    if (document.querySelector('.popup__close')) {
      var cardClose = document.querySelector('.popup__close');
      cardClose.addEventListener('click', onCloseClick);
      cardClose.addEventListener('keydown', onCloseKeydown);
      document.addEventListener('keydown', onEscapeKeydown);
    }
  };

  var onPinClick = function (evt) {
    openCard(evt.target);
  };

  var onPinKeydown = function (evt) {
    if (evt.key === window.data.ENTER_KEY) {
      openCard(evt.target);
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
      window.util.eraseElement('.map__card');


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

      var statusX = newPosition.x >= window.data.MIN_X - MAIN_PIN_OFFSET_X && newPosition.x <= window.data.MAX_X - MAIN_PIN_OFFSET_X;
      var statusY = newPosition.y >= window.data.MIN_Y - MAIN_PIN_OFFSET_Y && newPosition.y <= window.data.MAX_Y - MAIN_PIN_OFFSET_Y;
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

  pinList.addEventListener('click', onPinClick);
  pinList.addEventListener('keydown', onPinKeydown);
  pinMain.addEventListener('mousedown', onPinMainMousedown);


  window.map = {
    putMainPin: putMainPin
  };

})();
