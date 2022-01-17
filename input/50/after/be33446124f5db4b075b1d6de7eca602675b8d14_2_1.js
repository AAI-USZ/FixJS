function styleOnload(node, callback) {

    // for IE6-9 and Opera
    if (node.attachEvent || global.opera) {
      node.attachEvent('onload', callback)
      // NOTICE:
      // 1. "onload" will be fired in IE6-9 when the file is 404, but in
      //    this situation, Opera does nothing, so fallback to timeout.
      // 2. "onerror" doesn't fire in any browsers!
    }

    // Polling for Firefox, Chrome, Safari
    else {
      setTimeout(function() {
        poll(node, callback)
      }, 0) // Begin after node insertion
    }

  }