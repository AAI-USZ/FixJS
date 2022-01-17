function (responseText, xhr) {
    var data = responseText;
    
    if (dataType === 'json') {
      data = fJSON.decode(responseText);
    }
    
    cb(data, xhr);
  }