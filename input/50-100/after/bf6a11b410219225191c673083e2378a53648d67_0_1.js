function(response) {
    switch (response.header.status) {
    case  0:
      callback && callback(null, response.val, response.extras)
      break;
    case 1:
      callback && callback(null, null, null);
      break;
    default:
      var errorMessage = 'MemJS GET: ' + errors[response.header.status];
      console.log(errorMessage);
      callback && callback(new Error(errorMessage), null, null);
    }
  }