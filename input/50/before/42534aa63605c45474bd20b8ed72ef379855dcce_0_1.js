function(params){

  params = params || {};

  this.port = params.port || '';
  this.host = params.host || 'localhost';

  ////////////////////////////////////////
  // create a new class with a UDP connection
  this.client = dgram.createSocket("udp4");

  return this;

}