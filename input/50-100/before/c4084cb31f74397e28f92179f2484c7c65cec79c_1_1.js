function (err, real_version) {
        if(err) return _cb(new Error(err.message+'. Couldn\'t get version number of latest. Please run `nodist - latest` and try again'));
        
        fs.rename(fetch_target, n.sourceDir+'/'+real_version+'.exe', function(err) {
          if(err) return _cb(new Error(err.message+'. Couldn\'t rename latest. Please run `nodist - latest` and try again'));
          _cb(null, real_version);
        });
        
      }