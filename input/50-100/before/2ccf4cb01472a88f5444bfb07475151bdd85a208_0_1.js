function WriteStream( path, file ){
  stream.Stream.call(this);
  this.writeable = true;

  client.putStream( this, file, function( err, res ){
    console.log(res.statusCode);
  });
}