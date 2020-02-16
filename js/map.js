'use strict';


(function () {

  var MAIN_PIN_OFFSET_X = 32;
  var MAIN_PIN_OFFSET_Y = 84;
  var pinList = document.querySelector('.map__pins');
  var pinMain = pinList.querySelector('.map__pin--main');
  var address = document.querySelector('#address');
  var filtersBlock = document.querySelector('.map__filters-container');
  var CLASS_PIN = 'map__pin';
  var CLASS_MAIN_PIN = 'map__pin--main';

  var putMainPin = function (x, y) {
    pinMain.style.left = x + 'px';
    pinMain.style.top = y + 'px';
    address.value = (x + MAIN_PIN_OFFSET_X) + ', ' + (y + MAIN_PIN_OFFSET_Y);
  };

  var openCard = function (target) {
    var pinCheck = target.className === CLASS_PIN || target.parentNode.className === CLASS_PIN;
    var pinMainCheck = target.className === CLASS_MAIN_PIN || target.parentNode.className === CLASS_MAIN_PIN;
    var activePin = pinList.querySelector('.map__pin--active');

    if (pinCheck && !pinMainCheck) {
      if (!target.className) {
        target = target.parentElement;
      }
      var offer = window.start.offers[target.dataset.index];
      if (activePin) {
        activePin.classList.remove('map__pin--active');
      }
      target.classList.add('map__pin--active');
    }

    if (mapCard) {
      mapCard.remove();
    }

    if (offer) {
      closeCard();
      var card = window.card.render(offer);
      filtersBlock.before(card);
      var mapCard = document.querySelector('.map__card');
    }

    var closeCard = function () {
      if (mapCard) {
        mapCard.remove();
      }
      target.classList.remove('map__pin--active');
    };

    var closeListeners = function () {
      cardClose.removeEventListener('click', onCloseClick);
      cardClose.removeEventListener('keydown', onCloseKeydown);
      document.removeEventListener('keydown', onEscapeKeydown);
    };

    var onCloseClick = function () {
      closeListeners();
      closeCard();
    };

    var onCloseKeydown = function (evtClose) {
      if (evtClose.key === window.data.ENTER_KEY) {
        closeListeners();
        closeCard();
      }
    };

    var onEscapeKeydown = function (evtEscape) {
      if (evtEscape.key === window.data.ESC_KEY) {
        closeListeners();
        closeCard();
      }
    };

    if (document.querySelector('.popup__close')) {
      var cardClose = document.querySelector('.popup__close');
      cardClose.addEventListener('click', onCloseClick);
      cardClose.addEventListener('keydown', onCloseKeydown);
      document.addEventListener('keydown', onEscapeKeydown);
    }
  };

  var onPinClick = function (evtClick) {
    if (evtClick.target.className === CLASS_PIN || evtClick.target.parentElement.className === CLASS_PIN) {
      openCard(evtClick.target);
    }
  };

  var onPinKeydown = function (evtKeydown) {
    if (evtKeydown.key === window.data.ENTER_KEY) {
      if (evtKeydown.target.className === CLASS_PIN || evtKeydown.target.parentElement.className === CLASS_PIN) {
        openCard(evtKeydown.target);
      }
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
