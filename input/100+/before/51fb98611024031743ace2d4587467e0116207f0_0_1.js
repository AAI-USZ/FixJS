function(err, stat){
    if (err) return fn(err);
    // TODO: sys.pump() wtf?
    var req = self.put(filename, utils.merge({
        'Content-Length': stat.size
      , 'Content-Type': mime.lookup(stream.path)
    }, headers));
    req.on('response', function(res){
      fn(null, res);
      res.on('error', function(err) {
        fn(err);
      });
    });
    req.on('error', function(err){
      console.error('putStream req error, calling cb');
      console.error(err);
      fn(err, null);
    });
    stream
      .on('error', function(err){ console.error('put stream error, --stream.on'); fn(err); })
      .on('data', function(chunk){ req.write(chunk); })
      .on('end', function(){ req.end(); });
  }