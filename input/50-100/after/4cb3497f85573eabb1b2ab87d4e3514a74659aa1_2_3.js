function(name, callback){
  return;
  var listenClient = new Redis(this, this.core);
  
  listenClient.client.on('message', function(channel, message){
    callback(message);
  });
  listenClient.client.subscribe(name);
}