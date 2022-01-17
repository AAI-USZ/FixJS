function() {
    // XXX firefox is timing out trying to open the db after you clear local
    // storage, without firing onblocked or anything. =(
    return window.indexedDB || window.webkitIndexedDB ||
          /*window.mozIndexedDB || */ window.oIndexedDB ||
          window.msIndexedDB;
  }