function(err) {
    if(err) {
      fs.unlink(fetch_target, function(e) {// clean up
        if(e) return _cb(new Error(err.message+'. Couldn\'t clean up local copy of '+version));
        _cb(err);// pass on error
      });
      return;
    }
    
    if(version == 'latest') {
      // clean up "latest.exe"
      nodist.determineVersion(fetch_target, function (err, real_version) {
        if(err) return _cb(new Error(err.message+'. Couldn\'t get version number of latest. Please run `nodist - latest` and try again'));
        
        fs.rename(fetch_target, n.sourceDir+'/'+real_version+'.exe', function(err) {
          if(err) return _cb(new Error(err.message+'. Couldn\'t rename latest. Please run `nodist - latest` and try again'));
          _cb(null, real_version);
        });
        
      });
    }else
      return _cb(null, version);
  }