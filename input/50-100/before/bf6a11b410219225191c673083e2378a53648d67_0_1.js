function(response) {
    switch (response.header.status) {
    case  0:
      callback && callback(response.val, response.extras)
      break;
    case 1:
      callback && callback(null, null);
      break;
    default:
      console.log('MemJS GET: ' + errors[response.header.status]);
      callback && callback();
    }
  }