function getXHRObject() {
    var xhrObject;

    // From  http://blogs.msdn.com/b/ie/archive/2011/08/31/browsing-without-plug-ins.aspx
    // Best Practice: Use Native XHR, if available
    if (window.XMLHttpRequest) {
      // If IE7+, Gecko, WebKit: Use native object
      xhrObject = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
      // ...if not, try the ActiveX control
      xhrObject = new ActiveXObject('Microsoft.XM/LHTTP');
    }

    return xhrObject;
  }