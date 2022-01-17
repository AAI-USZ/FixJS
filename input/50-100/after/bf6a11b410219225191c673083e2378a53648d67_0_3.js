function(response) {
    switch (response.header.status) {
    case 0:
      callback && callback(null, true)
      break;
    case 2:
      callback && callback(null, false);
      break;
    default:
      var errorMessage = 'MemJS ADD: ' + errors[response.header.status];
      console.log(errorMessage, false);
      callback && callback(new Error(errorMessage), null, null);
    }
  }