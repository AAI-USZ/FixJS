function() {
    return window.indexedDB || window.webkitIndexedDB ||
          window.mozIndexedDB || window.oIndexedDB ||
          window.msIndexedDB;
  }