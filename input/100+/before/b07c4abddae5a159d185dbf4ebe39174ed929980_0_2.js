function search(str) {
  for(var i in index[str]) {
    if(data[i]) {
      var obj = data[i];
      obj.from = 'index';
      obj.query = str;
      console.log('result from index');
      rowCb(obj);
    }
  }
  findDocFor(str, function(err, data) {
    pending++;
    console.log('pending++: '+pending+' '+data);
    statusCb(pending>0?'busy':'idle');
    masterParser.parse(data, '', {}, function(err, obj) {
      pending--;
      console.log('pending--: '+pending);
      statusCb(pending>0?'busy':'idle');
      if(obj) {
        obj.userAddress = str;
        add(str, obj);
        obj.from='live';
        obj.query=str;
        console.log('result from live');
        rowCb(obj);
      }
    });
  });
}