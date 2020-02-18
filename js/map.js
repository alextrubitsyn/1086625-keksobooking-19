'use strict';


(function () {

  var MAIN_PIN_OFFSET_X = 32;
  var MAIN_PIN_OFFSET_Y = 84;
  var CLASS_PIN = 'map__pin';
  var CLASS_ACTIVE_PIN = 'map__pin--active';
  var CLASS_MAIN_PIN = 'map__pin--main';
  var activePin;


  var putMainPin = function (x, y) {
    window.data.pinMain.style.left = x + 'px';
    window.data.pinMain.style.top = y + 'px';
    window.data.address.value = (x + MAIN_PIN_OFFSET_X) + ', ' + (y + MAIN_PIN_OFFSET_Y);
  };

  var openCard = function (target) {
    var pinCheck = target.className === CLASS_PIN || target.parentNode.className === CLASS_PIN;
    var pinActiveCheck = target.className === CLASS_ACTIVE_PIN || target.parentNode.className === CLASS_ACTIVE_PIN;
    var pinMainCheck = target.className === CLASS_MAIN_PIN || target.parentNode.className === CLASS_MAIN_PIN;

    var closeCard = function () {
      if (window.data.cardOffer) {
        window.data.cardOffer.remove();
      }
      if (activePin) {
        activePin.classList.remove(CLASS_ACTIVE_PIN);
        activePin = '';
      }
    };

    if (pinCheck && !pinMainCheck && !pinActiveCheck) {
      if (!target.className) {
        target = target.parentElement;
      }
      var offer = window.start.offers[target.dataset.index];
      if (offer) {
        if (activePin) {
          closeCard();
        }
        target.classList.add(CLASS_ACTIVE_PIN);
        activePin = target;
        window.data.cardOffer = window.card.render(offer);
        window.data.filtersBlock.before(window.data.cardOffer);
      }

    }

    window.data.closeListeners = function () {
      cardClose.removeEventListener('click', onCloseClick);
      cardClose.removeEventListener('keydown', onCloseKeydown);
      document.removeEventListener('keydown', onEscapeKeydown);
    };

    var onCloseClick = function () {
      window.data.closeListeners();
      closeCard();
    };

    var onCloseKeydown = function (evtClose) {
      if (evtClose.key === window.data.ENTER_KEY) {
        window.data.closeListeners();
        closeCard();
      }
    };

    var onEscapeKeydown = function (evtEscape) {
      if (evtEscape.key === window.data.ESC_KEY) {
        window.data.closeListeners();
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
    openCard(evtClick.target);
  };

  var onPinKeydown = function (evtKeydown) {
    if (evtKeydown.key === window.data.ENTER_KEY) {
      openCard(evtKeydown.target);
    }
  };

  var onPinMainMousedown = function (evtDown) {
    evtDown.preventDefault();

    var startPosition = {
      x: evtDown.clientX,
      y: evtDown.clientY
    };

    window.data.pinMain.style.zIndex = '2';

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
        x: window.data.pinMain.offsetLeft - shift.x,
        y: window.data.pinMain.offsetTop - shift.y
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
      window.data.pinMain.style.zIndex = '';
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.data.pinList.addEventListener('click', onPinClick);
  window.data.pinList.addEventListener('keydown', onPinKeydown);
  window.data.pinMain.addEventListener('mousedown', onPinMainMousedown);


  window.map = {
    putMainPin: putMainPin
  };

})();
