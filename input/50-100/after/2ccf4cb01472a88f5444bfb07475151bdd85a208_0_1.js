function WriteStream( path, file ){
  var source = this;
  stream.Stream.call(this);
  this.writable = true;
  this.readable = true;
  this.paused = false;

  client.putStream( this, file, function( err, res ){
    console.log('response status', res.statusCode);
    res.on('data', function(chunk) {
           console.log("response body chunk: " + chunk);
       });
  });
}