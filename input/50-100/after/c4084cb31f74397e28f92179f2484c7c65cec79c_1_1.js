function (err, real_version) {
        if(err) return _cb(new Error('Couldn\'t determine version number of latest: '+err.message+'. Please run `nodist - latest` before you try again'));
        
        fs.rename(fetch_target, n.sourceDir+'/'+real_version+'.exe', function(err) {
          if(err) return _cb(new Error('Couldn\'t rename fetched executable: '+err.message+'. Please run `nodist - latest` before you try again'));
          _cb(null, real_version);
        });
        
      }