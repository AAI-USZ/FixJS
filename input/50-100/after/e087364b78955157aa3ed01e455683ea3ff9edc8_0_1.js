function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        cb(xhr.responseText, xhr);
      }
      else {
        if (errorCb) {
          errorCb(xhr.responseText, xhr.statusText, xhr);
        }
      }
    }
  }