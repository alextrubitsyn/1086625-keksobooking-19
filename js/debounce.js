'use strict';

(function () {
  var DEBOUNCE_TIME = 500;

  window.debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parametrs = arguments;

      if (lastTimeout) {
        lastTimeout = window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parametrs);
      }, DEBOUNCE_TIME);
    };
  };
})();
