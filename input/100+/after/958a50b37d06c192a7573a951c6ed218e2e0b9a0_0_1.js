function send ( status, mime_type, data ) {

    if(arguments.length == 1) {
      if(typeof status == 'number') {
        mime_type = 'text/plain';
        data = '';
      } else {
        mime_type = 'text/html';
        data = status;
        status = 200;
      }
    } else if(arguments.length == 2){
      data = mime_type;
      mime_type = 'text/plain';
    }

    if(!(data instanceof Buffer)) {
      data = new Buffer(data);
    }
    

    callback(status,status_text[status],mime_type,data);
  }