function fetch(version, fetch_target, _cb) {
  var n = this;
  var url = this.sourceUrl+'/'+(version=='latest'?'':'v')+version+'/node.exe';
  
  // Check online availability
  if(nodist.compareable(version) < nodist.compareable('0.5.1')) {
    return _cb(new Error('There are no builds available for versions older than 0.5.1'));
  }
  
  // Clean up things on error and rename 'latest' to real version
  var cb = function(err) {
    if(err) {
      fs.unlink(fetch_target, function(e) {// clean up
        if(e) return _cb(new Error(err.message+'. Couldn\'t clean after error: '+e.message));
        _cb(err);// pass on error
      });
      return;
    }
    
    if(version == 'latest') {
      // clean up "latest.exe"
      nodist.determineVersion(fetch_target, function (err, real_version) {
        if(err) return _cb(new Error('Couldn\'t determine version number of latest: '+err.message+'. Please run `nodist - latest` before you try again'));
        
        fs.rename(fetch_target, n.sourceDir+'/'+real_version+'.exe', function(err) {
          if(err) return _cb(new Error('Couldn\'t rename fetched executable: '+err.message+'. Please run `nodist - latest` before you try again'));
          _cb(null, real_version);
        });
        
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
  stream.on('error', function(err) {
    cb(new Error('Couldn\'t write fetched data to file: '+err.message));
  });
}