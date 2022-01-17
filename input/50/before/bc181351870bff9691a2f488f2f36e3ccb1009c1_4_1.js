function getXHRObject() {
    var xhrObject;

    if (window.ActiveXObject) {
      xhrObject = new ActiveXObject('Microsoft.XMLHTTP');
    }
    else if (window.XMLHttpRequest) {
      xhrObject = new XMLHttpRequest();
    }

    return xhrObject;
  }