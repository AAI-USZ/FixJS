function(success) {
    // change JSON request URL to be different from current URL to avoid chrome caching bug
    // http://stackoverflow.com/questions/9956255/chrome-displays-ajax-response-when-pressing-back-button
    $.ajax({
      url: '/?',
      method: 'GET',
      dataType: 'json',
      success: success
    });
  }