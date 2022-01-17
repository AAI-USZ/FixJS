function(params){

  params = params || {};

  this.port = params.port || '8125';
  this.host = params.host || 'localhost';

  ////////////////////////////////////////
  // create a new class with a UDP connection
  this.client = dgram.createSocket("udp4");

  return this;

}