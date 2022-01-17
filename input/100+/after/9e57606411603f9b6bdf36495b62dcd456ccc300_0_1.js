function (res) {
    var chunks = [], size = 0;
    res.on('data', function (chunk) {
      size += chunk.length;
      chunks.push(chunk);
    });
    res.on('end', function () {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      var data = null;
      switch (chunks.length) {
      case 0: 
        data = new Buffer(0); 
        break;
      case 1: 
        data = chunks[0]; 
        break;
      default:
        data = new Buffer(size);
        for (var i = 0, pos = 0, l = chunks.length; i < l; i++) {
          chunks[i].copy(data, pos);
          pos += chunks[i].length;
        }
        break;
      }
      var err = null;
      if (args.dataType === 'json') {
        try {
          data = JSON.parse(data);
        } catch (e) {
          err = e;
        }
      }
      callback.call(context, err, data, res);
    });
  }