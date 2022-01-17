function(e) {
    if(e.which == 13) {
      var chunks = $(this).val().match(/.{1,1024}/g)
        , len = chunks.length;

      for(var i = 0; i<len; i++) {
        socket.emit('my msg', {
          msg: chunks[i]
        });
      }

      $(this).val('');

      return false;
    }
  }