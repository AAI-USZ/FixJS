function(callback) {
  var request = makeRequestBuffer(0x10, '', '', '');
  var result = {};
  for (i in this.servers) {
    var serv = this.servers[i];
    serv.on('response', function statsHandler(response) {
      if (response.header.totalBodyLength == 0) {
        serv.removeListener('response', statsHandler);
        callback && callback(serv.host + ":" + serv.port, result);
        return;
      }
      switch (response.header.status) {
      case  0:
        result[response.key.toString()] = response.val.toString();
        break;
      default:
        console.log('MemJS STATS: ' + response.header.status);
        callback && callback();
      }
    });
    serv.on('error', function() {
      callback && callback(serv.host + ":" + serv.port, null);
    });
    serv.write(request);
  }
}