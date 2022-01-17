function(xhr, textStatus, errorThrown) {
      var response = builder.selenium2.rcPlayback.parseServerResponse(xhr.responseText);
      if (errorCallback) {
        errorCallback(response);
      } else {
        builder.selenium2.rcPlayback.handleError(response);
      }
    }