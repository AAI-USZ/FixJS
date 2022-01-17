function(_super) {

  __extends(UploadRequest, _super);

  UploadRequest.name = 'UploadRequest';

  function UploadRequest(request) {
    this.request = request;
  }

  UploadRequest.prototype.begin = function() {
    var boundary, headerField, headerValue, parser,
      _this = this;
    if (this.request.headers['content-type'].indexOf('application/octet-stream') !== -1) {
      this.headers = this.request.headers;
      stream = new stream.Stream;
      stream.headers = this.request.headers;
      stream.filename = this.request.headers['x-file-name'];
      this.emit('file', stream);
      this.request.on('data', function(chunk) {
        return stream.emit('data', chunk);
      });
      this.request.on('end', function() {
        stream.readable = false;
        return stream.emit('end');
      });
      return this.request.on('error', function(error) {
        stream.readable = false;
        return stream.emit('error', error);
      });
    } else if (this.request.headers['content-type'].indexOf('multipart/') !== -1) {
      boundary = this.request.headers['content-type'].match(/boundary=([^]+)/i)[1];
      parser = new multipart.MultipartParser(boundary);
      headerField = null;
      headerValue = null;
      stream = null;
      parser.on('partBegin', function() {
        stream = new stream.Stream;
        stream.headers = {};
        stream.filename = null;
        headerField = '';
        return headerValue = '';
      });
      parser.on('headerField', function(b, start, end) {
        return headerField += b.toString('utf-8', start, end);
      });
      parser.on('headerValue', function(b, start, end) {
        return headerValue += b.toString('utf-8', start, end);
      });
      parser.on('headerEnd', function() {
        stream.headers[headerField.toLowerCase()] = headerValue;
        headerField = '';
        return headerValue = '';
      });
      parser.on('headersEnd', function() {
        var contentDisposition, m;
        if (stream.headers['content-disposition']) {
          contentDisposition = stream.headers['content-disposition'];
          if (m = contentDisposition.match(/filename="([^]+)"/i)) {
            stream.headers['content-type'] = 'application/octet-stream';
            stream.filename = m[1].substr(m[1].lastIndexOf('\\') + 1);
            stream.readable = true;
            return _this.emit('file', stream);
          }
        }
      });
      parser.on('partData', function(b, start, end) {
        if (stream && stream.filename) {
          return stream.emit('data', b.slice(start, end));
        }
      });
      parser.on('partEnd', function() {
        if (stream && stream.filename) {
          stream.readable = false;
          return stream.emit('end');
        }
      });
      this.request.on('data', function(chunk) {
        return parser.write(chunk);
      });
      this.request.on('end', function() {
        return parser.end();
      });
      return this.request.on('error', function(error) {
        if (stream && stream.filename) {
          stream.readable = false;
          return stream.emit('error', error);
        }
      });
    }
  };

  return UploadRequest;

}