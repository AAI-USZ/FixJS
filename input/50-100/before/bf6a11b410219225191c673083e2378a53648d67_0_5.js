function(response) {
    switch (response.header.status) {
    case  0:
      callback && callback(true)
      break;
    case 1:
      callback && callback(false);
      break;
    default:
      console.log('MemJS DELETE: ' + errors[response.header.status]);
      callback && callback();
    }
  }