function(res){
    res.setEncoding('utf-8');

    callback(stream);

    checkResStatus(res.statusCode, stream);

    res.on('data', function(chunk){
      buf += chunk;
      if(buf.indexOf('\r') !== -1){
        buf = buf.slice(0, buf.length - 2);
        var arr_buf = buf.split('\r\n');
        try{
          arr_buf.forEach(function(elem){
            var json_stream = JSON.parse(elem);
            if(json_stream.delete)
              stream.emit('delete', json_stream);
            else if(json_stream.limit)
              stream.emit('limit', json_stream);
            else if(json_stream.scrub_geo)
              stream.emit('scrub_geo', json_stream)
            else 
              stream.emit('tweet', json_stream);
          });
        } catch(e){
          stream.emit('error', e);
        }
        buf = '';
      }
    });

    res.on('close', function(){
      stream.emit('connection error');
    });

    res.on('end', function(){
      stream.destroy();
    });

    stream.on('end', function(){
      stream.destroy();
    });

  }