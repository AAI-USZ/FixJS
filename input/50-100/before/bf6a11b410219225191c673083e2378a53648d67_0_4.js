function(response) {
    switch (response.header.status) {
    case 0:
      callback && callback(true)
      break;
    case 1:
      callback && callback(false);
      break;
    default:
      console.log('MemJS REPLACE: ' + errors[response.header.status]);
      callback && callback();
    }
  }