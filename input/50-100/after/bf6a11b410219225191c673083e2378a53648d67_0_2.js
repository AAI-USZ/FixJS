function(response) {
    switch (response.header.status) {
    case 0:
      callback && callback(null, true)
      break;
    default:
      var errorMessage = 'MemJS SET: ' + errors[response.header.status];
      console.log(errorMessage, false);
      callback && callback(new Error(errorMessage), null, null);
    }
  }