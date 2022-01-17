function(res){
  if (!zlib) return;

  var unzip = zlib.createUnzip()
    , decodedStream = new Stream
    , decoder;

  // pipe to unzip
  res.pipe(unzip);

  // override `setEncoding` to capture encoding
  res.setEncoding = function(type){
    decoder = new StringDecoder(type);
  };

  // decode upon decompressing with captured encoding
  unzip.on('data', function(buf){
    var str = decoder.write(buf);
    if (str.length) decodedStream.emit('data', str);
  });

  unzip.on('end', function(){
    decodedStream.emit('end');
  });

  // override `on` to capture data listeners
  var _on = res.on;
  res.on = function(type, fn){
    if ('data' == type || 'end' == type) {
      decodedStream.on(type, fn);
    } else {
      _on.call(res, type, fn);
    }
  };
}