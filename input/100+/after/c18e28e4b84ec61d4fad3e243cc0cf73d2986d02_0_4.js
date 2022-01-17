function(locator, callback, errorCallback) {
  builder.selenium2.rcPlayback.send("POST", "/element", JSON.stringify(locator),
    function(response) {
      if (builder.selenium2.rcPlayback.hasError(response)) {
        if (errorCallback) {
          errorCallback(response);
        } else {
          builder.selenium2.rcPlayback.handleError(response);
        }
      } else {
        if (callback) {
          callback(response.value.ELEMENT);
        } else {
          builder.selenium2.rcPlayback.recordResult({success: true});
        }
      }
    }
  );
}