function createClient(options) {

  if (!options.bucket) throw new Error('aws "bucket" required');
  
  if (!options.prefix) {
    options.prefix = '/tmp/mox';
  }

  // create storage dir, if it doesn't exists
  if (!path.existsSync(options.prefix)) {
    fs.mkdirSync(options.prefix, 0777);
  }
  
  // create bucket dir, if it does not exists
  var bucketPath = path.join(options.prefix, options.bucket);
  if (!path.existsSync(bucketPath)) {
    fs.mkdirSync(bucketPath, 0777);
  }

  
  function getFilePath(filename, createPath) {
    var filePath = path.join(bucketPath, filename);
    if (createPath) {
      // ensure that the path to the file exists
      createRecursive(path.dirname(filePath));
      function createRecursive(p) {
        if (path.existsSync(p) || p === bucketPath) return;
        createRecursive(path.join(p, '..'));
        fs.mkdirSync(p, 0777);
      }
    }
    return filePath;
  }

  
  function emitResponse(request, opts) {
    if (request.responseEmitted) {
      console.error('Response already emitted.')
      return;
    }
    
    var xml;
    var response = opts.response || fakeReadableStream();

    response.httpVersion = '1.1';
    
    response.headers = response.headers || (opts.headers || {});
    response.headers.date = (new Date()).toUTCString();
    response.headers['server'] = 'Mox';
    response.headers['connection'] = 'close';

    response.statusCode = opts.code || 200;
    if (opts.err) {
      response.headers['content-type'] = 'application/xml';
      response.headers['transfer-encoding'] = 'chunked';
      xml = ['<?xml version="1.0" encoding="UTF-8"?><Error><Code>',
      opts.err.code, '</Code><Message>', opts.err.msg, '<Message></Error>'].join('');
    }
    response.headers['content-length'] = response.headers['content-length'] || (xml && xml.length || 0);
    
    request.writable = false;
    request.emit('response', response);
    request.responseEmitted = true;
    if (opts.err) {
      response.emit('data', xml);
    }
    if (!opts.hasbody) {
      response.emit('end');
      response.readable = false;
      response.emit('close');
    }
  }
  
  
  var client = new function() {};
  
  client.put = function put(filename, headers) {
    var filePath = getFilePath(filename, true);
    var fileLength = 0;
    var md5 = crypto.createHash('md5');
    
    // create file stream to write the file data
    var ws = fs.createWriteStream(filePath);
    var request = wrapWritableStream(ws);

    ws.on('open', function() { request.emit('continue'); });
    ws.on('error', function(err) {
      emitResponse(request, {code:403, err:{code:'AccessDenied', msg:err.message}});
    });

    // wrap request.write() to allow calculation of MD5 hash
    request._write = request.write;
    request.write = function write(chunk, enc) {
      fileLength += chunk.length;
      md5.update(chunk);
      return request._write(chunk, enc);
    };

    // wrap request.end() to write meta-data file and emit response
    request._end = request.end;
    request.end = function end(chunk, enc) {
      request._end(chunk, enc);

      // write the meta data file
      headers['content-length'] = fileLength;
      headers.Date = (new Date()).toUTCString();
      headers.ETag = '"' + md5.digest('hex') + '"';

      var meta = {};
      Object.keys(headers).forEach(function(key) {
        meta[key.toLowerCase()] = headers[key];
      });

      fs.writeFile(filePath + '.meta', JSON.stringify(meta), 'utf8', function(err) {
        if (err) {
          emitResponse(request, {code:403, err:{code:'AccessDenied', msg:err.message}});
          return;
        }
        // when all data is written, the response is emitted
        emitResponse(request, {headers:{etag:headers.ETag}});
      });
    };

    request.abort = request.destroy;

    return request;
  };
  

  client.get = function get(filename, headers) {
    var request = fakeWritableStream();
    var filePath = getFilePath(filename);
    
    // read meta data
    fs.readFile(filePath + '.meta', 'utf8', function(err, data) {
      if (err) {
        if (err.code === 'ENOENT') {
          // no such file
          emitResponse(request, {code:404, err:{code:'NoSuchKey', msg:'The specified key does not exist.'}});
        }
        else {
          // other error
          emitResponse(request, {code:500, err:{code:'InternalError', msg:err.message}});
        }
        return;
      }
      
      // create file stream for reading the requested file
      var rs = fs.createReadStream(filePath);
      var response = wrapReadableStream(rs);
      response.headers = JSON.parse(data);
      response.headers['last-modified'] = response.headers['date'];

      rs.on('open', function() {
        // file is ready, emit response
        emitResponse(request, {response:response, hasbody:true}) 
      });
      rs.on('error', function(err) {
        // emit response indicating the file read error
        emitResponse(500, {code:'InternalError', msg:err.message});
      });
    });

    request.abort = request.destroy;

    return request;
  };

  
  client.head = function head(filename, headers) {
    var request = fakeWritableStream();
    var filePath = getFilePath(filename);

    // read meta data
    fs.readFile(filePath + '.meta', 'utf8', function(err, data) {
      if (err) {
        if (err.code === 'ENOENT') {
          // no such file
          emitResponse(request, {code:404, err:{code:'NoSuchKey', msg:'The specified key does not exist.'}});
        }
        else {
          // other error
          emitResponse(request, {code:500, err:{code:'InternalError', msg:err.message}});
        }
        return;
      }

      headers = JSON.parse(data);
      headers['last-modified'] = headers['date'];
      emitResponse(request, {headers:headers});
    });

    request.abort = request.destroy;

    return request;
  };
  

  client.del = function del(filename) {
    var request = fakeWritableStream();
    var filePath = getFilePath(filename);
    
    // remove the file
    fs.unlink(filePath, function(err) {
      // ignore "no such file" errors
      if (err && err.code !== 'ENOENT') {
        emitResponse(request, {code:500, err:{code:'InternalError', msg:err.message}});
        return;
      }
      // remove meta data file
      fs.unlink(filePath + '.meta', function(err) {
        if (err && err.code !== 'ENOENT') {
          emitResponse(request, {code:500, err:{code:'InternalError', msg:err.message}});
          return;
        }
        // when files are deleted, emit the response
        emitResponse(request, {code:204})
      });
    });

    request.abort = request.destroy;

    return request;
  };

  client.url =
  client.http = function(filename){
    return (filename)
  };

  client.https = function(filename){
    return (filename)
  };

  return client;
}