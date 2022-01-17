function(data) {
  if(data !== paused) {
    var response = {write: write, id: data};
    if(!write) {
      Rest.get(CLOUD + '/store/'+data).on('complete', function(res){
        if(sockets[res.type]) {
          response.data = res;
          sockets[res.type].send(JSON.stringify(response));
          console.log('Sending read to', res.type);
        }
      });
      paused = data;
    } else {
      sockets[write].send(JSON.stringify(response));
      write = false;
      paused = data;
    }
    timeout = setTimeout(function(){
      paused = false;
    }, 30000);
  }
}