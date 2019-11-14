'use strict';

(function () {
  var SUCCESS_STATUS = 200;
  var TIMEOUT = 10000;
  var URL = 'https://js.dump.academy/keksobooking/data';
  var xhr = new XMLHttpRequest();

  var loadRequest = function () {
    xhr.open('GET', URL);
    xhr.send();
  };

  loadRequest();

  var load = function (onLoad, onError) {
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

  };

  window.backend = {
    load: load
  };
})();
