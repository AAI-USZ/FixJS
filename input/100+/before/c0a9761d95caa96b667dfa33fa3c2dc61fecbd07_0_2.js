function fetch(version, fetch_target, _cb) {
  var n = this;
  var url = this.sourceUrl+'/'+(version=='latest'?'':'v')+version+'/node.exe';
  
  // Check online availability
  if(nodist.compareable(version) < nodist.compareable('0.5.1')) {
    return _cb(new Error('There are no builds available for versions older than 0.5.1.'));
  }
  
  // Clean up things on error and rename latest to real version
  var cb = function(err) {
    if(err) {
      fs.unlinkSync(fetch_target);
      return _cb(err);
    }
    if(version == 'latest') {
      // clean up "latest.exe"
      nodist.determineVersion(fetch_target, function (err, real_version) {
        fs.renameSync(fetch_target, n.sourceDir+'/'+real_version+'.exe');
        _cb(null, real_version);
      });
    }else
    return _cb(null, version);
  };
  
  // fetch from url
  var stream = request(url, function(err, resp){
    if(err || resp.statusCode != 200) {
      return cb(new Error('Couldn\'t fetch '+version+' ('+(err? err.message : 'HTTP '+resp.statusCode)+')'));
    }
    cb();
  });
  stream.pipe(fs.createWriteStream(fetch_target));
  stream.on('error', cb);
}