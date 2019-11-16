'use strict';

(function () {
  var SUCCESS_STATUS = 200;
  var TIMEOUT = 10000;
  var setupRequest = function (onLoad, onError, xhr) {
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

  var save = function (data, onLoad, onError, url) {
    var xhr = new XMLHttpRequest();
    setupRequest(onLoad, onError, xhr);
    xhr.open('POST', url);
    xhr.send(data);
  };

  var load = function (onLoad, onError, url) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    setupRequest(onLoad, onError, xhr);
    xhr.open('GET', url);
    xhr.send();
  };
  window.backend = {
    save: save,
    load: load
  };
})();
