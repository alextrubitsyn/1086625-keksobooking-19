'use strict';

(function () {
  var TIMEOUT = 10000;
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_SAVE = 'https://js.dump.academy/keksobooking';

  var StatusCode = {
    '200': 'OK',
    '301': 'Данные перенесены на другой ресурс',
    '400': 'Синтаксическая ошибка в запросе к серверу',
    '401': 'Ошибка аутентификации',
    '403': 'Ошибка ограничения доступа',
    '404': 'Ошибка адреса запроса',
    '500': 'Ошибка сервера',
    'default': 'Ошибка сетевого обмена, код: '
  };

  var setRequestHandlers = function (xhr, onLoad, onError) {
    xhr.timeout = TIMEOUT;

    var onXhpLoad = function () {
      if (StatusCode[xhr.status] === 'OK') {
        onLoad(xhr.response);
      } else {
        onError(StatusCode[xhr.status] || StatusCode['default'] + xhr.status);
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

  var save = function (data, onSave, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    setRequestHandlers(xhr, onSave, onError);

    xhr.open('POST', URL_SAVE);

    xhr.send(data);
  };

  window.request = {
    load: load,
    save: save
  };

})();
