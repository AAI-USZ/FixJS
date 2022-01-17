function (url, postData, cb, requestType, errorCb, isFileUpload) {
  requestType === undefined && (requestType = 'GET');
  isFileUpload === undefined && (isFileUpload = false);
  requestType = requestType.toUpperCase();
  if (requestType === 'POST' && (postData === undefined || postData === null)) {
    postData = {};
  }

  /**
   * @private
   * @type function()
   */
  var getXHR = function () {
    if (!sAJAXRequest._supportsXHR) {
      if (window.ActiveXObject) {
        var activeXVersions = ['Msxml2', 'Microsoft'];
        for (var i = 0; i < activeXVersions.length; i++) {
          try {
            return new ActiveXObject(activeXVersions[i] + '.XMLHTTP');
          }
          catch (e) {}
        }
      }
    }
    else if (window.XMLHttpRequest) {
      return new XMLHttpRequest();
    }
    return null;
  };

  /**
   * @type XMLHttpRequest
   * @private
   */
  var xhr = getXHR();
  if (!xhr) {
    errorCb('No support for AJAX request.');
    return xhr;
  }

  xhr.open(requestType, url, true);

  var postDataStr;
  if (requestType === 'POST') {
    if (!isFileUpload) {
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    else {
      xhr.setRequestHeader('Content-type', 'multipart/form-data');
    }
    postDataStr = sAJAXRequest._makeParameters(postData);
    //xhr.setRequestHeader('Content-length', postData.length);
    //xhr.setRequestHeader('Connection', 'close');
  }
  else {
    postDataStr = null;
  }

  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  /**
   * @type function()
   * @private
   */
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        cb(xhr.responseText, xhr);
      }
      else {
        if (errorCb) {
          errorCb(xhr.statusText);
        }
      }
    }
  };
  xhr.send(postDataStr);

  return xhr;
}