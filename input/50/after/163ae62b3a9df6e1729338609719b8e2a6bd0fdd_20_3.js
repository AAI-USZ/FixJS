function setReturnTo(returnToURL) {
    storage.returnTo = JSON.stringify({
      at: new Date().toString(),
      url: returnToURL
    });
  }