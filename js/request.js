'use strict';

(function () {
  var TIMEOUT = 10000;
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';

  var StatusCode = {
    OK: 200
  };

  var searchError = function (cod) {
    var errors = {
      '400': 'Синтаксическая ошибка в запросе к серверу',
      '401': 'Ошибка аутентификации',
      '403': 'Ошибка ограничения доступа',
      '404': 'Ошибка адреса запроса',
      '500': 'Ошибка сервера',
      'default': 'Ошибка сетевого обмена, код: ' + cod
    };
    return errors[cod] || errors['default'];
  };


  var setRequestHandlers = function (xhr, onLoad, onError) {
    xhr.timeout = TIMEOUT;

    var onXhpLoad = function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError(searchError(xhr.status));
      }
      xhr.removeEventListener('load', onXhpLoad);
    };

    var onXhpError = function () {
      onError('Ошибка подключения к сети! Проверьте сетевое соединение!');
      xhr.removeEventListener('error', onXhpError);
    };

    var onXhpTimeout = function () {
      onError('Запрос не успел выполниться за ' + (xhr.timeout / 1000) + 'с! Повторите запрос позднее!');
      xhr.removeEventListener('timeout', onXhpTimeout);
    };

    xhr.addEventListener('load', onXhpLoad);
    xhr.addEventListener('error', onXhpError);
    xhr.addEventListener('timeout', onXhpTimeout);
  };

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    setRequestHandlers(xhr, onLoad, onError);

    xhr.open('GET', URL_LOAD);

    xhr.send();
  };

  window.request = {
    load: load
  };

})();
