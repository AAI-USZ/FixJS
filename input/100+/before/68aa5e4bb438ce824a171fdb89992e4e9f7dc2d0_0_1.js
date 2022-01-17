function(part) {
    if(!part.filename) {
      form.handlePart(part);
      return;
    }
    if (verified) {
      var name = part.filename.replace(/\.[^\.]*/g,""),
          ext = part.filename.replace(/[^\.]*/,""),
          file = escape(name)+ext;
      pending++;
      part.headers["content-disposition"] = 'form-data; name="'+file+'"; filename="'+file+'"';
      self._rackspace.saveStream( container, escape(file), part, function( err, success ) {
        if (err) {
          console.log( err );
        }
        sent++;
        socket.emit("send", Math.round(sent * 100 / pending)+"%");
        if(pending === sent) {
          socket.emit("done");
          delete sockets[hash];
        }
      });
    }
  }