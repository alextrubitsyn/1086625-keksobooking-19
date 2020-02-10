'use strict';


(function () {

  var pinList = document.querySelector('.map__pins');

  var erasePx = function (element) {
    return element.slice(0, -2);
  };


  var eraseCard = function () {
    var cardArticle = document.querySelector('.map__card');
    if (cardArticle) {
      cardArticle.parentNode.removeChild(cardArticle);
    }
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
      var addressX = +erasePx(target.style.left) + window.pin.OFFSET_X;
      var addressY = +erasePx(target.style.top) + window.pin.OFFSET_Y;
      for (var i = 0; i < window.data.offers.length; i++) {
        if (addressX === window.data.offers[i].location.x && addressY === window.data.offers[i].location.y) {
          var offer = window.data.offers[i];
        }
      }
    }

    if (document.querySelector('.map__card')) {
      eraseCard();
    }

    if (offer) {
      var card = window.card.render(offer);
      document.querySelector('.map__filters-container').before(card);
    }

    var onCloseClick = function () {
      removeCardListener();
      eraseCard();
    };

    var onCloseKeydown = function (evtClose) {
      if (evtClose.key === window.data.ENTER_KEY) {
        removeCardListener();
        eraseCard();
      }
    };

    var onEscapeKeydown = function (evtEscape) {
      if (evtEscape.key === window.data.ESC_KEY) {
        removeCardListener();
        eraseCard();
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

  pinList.addEventListener('click', onPinClick);
  pinList.addEventListener('keydown', onPinKeydown);

})();
