function(response) {
    switch (response.header.status) {
    case 0:
      callback && callback(true)
      break;
    default:
      console.log('MemJS SET: ' + errors[response.header.status]);
      callback && callback();
    }
  }