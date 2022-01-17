function (req, options, callback) {
  console.log('Got text/plain');
  var buf = '';
  req.setEncoding('utf8');
  req.on('data', function(chunk){
    buf += chunk;
  });
  req.on('end', function(){
    try {
      if (!buf.length) {
        req.body = {};
      } else {
        req.body = JSON.parse(buf);
      }
      callback();
    } catch (err) {
      callback(err);
    }
  });
}