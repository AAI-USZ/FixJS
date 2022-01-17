function checkout(source, cb) {
  var n = this;
  
  var onerror = function(err) {
    var str = 'Couldn\'t activate version: '+err.message;
    fs.unlink(n.target, function(e) {
      if(e) return cb(new Error(str+'. Couldn\'t clean up after error: '+e.message));
      cb(new Error(str+'. Removed globally used version'));
    });
  };
  
  source = fs.createReadStream(source);
  source.pipe(fs.createWriteStream(this.target))
  .on('close', cb)
  .on('error', onerror);
  source.on('error', onerror);
}