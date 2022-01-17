function( data ){
//  console.log('WriteStream.write');
  this.emit('data', data);
  return !this.paused;
}