function getPdf(arg, callback) {
  var params = arg;
  if (typeof arg === 'string')
    params = { url: arg };

  var xhr = new XMLHttpRequest();

  xhr.open('GET', params.url);

  var headers = params.headers;
  if (headers) {
    for (var property in headers) {
      if (typeof headers[property] === 'undefined')
        continue;

      xhr.setRequestHeader(property, params.headers[property]);
    }
  }

  xhr.mozResponseType = xhr.responseType = 'arraybuffer';
  var protocol = params.url.indexOf(':') < 0 ? window.location.protocol :
    params.url.substring(0, params.url.indexOf(':') + 1);
  xhr.expected = (protocol === 'http:' || protocol === 'https:') ? 200 : 0;

  if ('progress' in params)
    xhr.onprogress = params.progress || undefined;

  var calledErrorBack = false;

  if ('error' in params && !calledErrorBack) {
    calledErrorBack = true;
    xhr.onerror = params.error || undefined;
  }

  xhr.onreadystatechange = function getPdfOnreadystatechange(e) {
    if (xhr.readyState === 4) {
      if (xhr.status === xhr.expected) {
        var data = (xhr.mozResponseArrayBuffer || xhr.mozResponse ||
                    xhr.responseArrayBuffer || xhr.response);
        callback(data);
      } else if (params.error && !calledErrorBack) {
        calledErrorBack = true;
        params.error(e);
      }
    }
  };
  xhr.send(null);
}