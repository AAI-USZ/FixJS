function( req, res, next ) {
  var self = this,
      container = req.param( 'container' ),
      hash = req.param( 'hash' ),
      bcrypt = require( 'bcrypt' ),
      verified = bcrypt.compareSync(container, hash);
  if ( verified ) {
    var file = req.params.file,
        ext = file.split( '.' ).pop(),
        newFile = escape(req.param( 'name' )+'.'+ext),
        headers = {
          'content-disposition': 'form-data; name="'+newFile+'"; filename="'+newFile+'"',
          'destination': '/'+container+'/'+escape(newFile)
        };
    if (newFile === file) {
      res.send(200);
      return;
    }
    self._rackspace.updateFile( container, escape(escape(file)), headers, function (err, success) {
      if (err) {
        console.log(err);
      }
      res.writeContinue();
      self._rackspace.remove( container, escape(escape(file)), function( err, success ) {
        if (err) {
          console.log(err);
        }
        res.send(200);
      });
    });
  } else {
    res.send(409);
  }
}