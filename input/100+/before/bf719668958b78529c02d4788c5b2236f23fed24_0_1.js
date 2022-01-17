function(err, available) {
      if(err) return cb(err);
      
      switch(version) {
      
      case 'all':
        available.forEach(function(v) {
          if(installed.indexOf(v) != -1)
            return cb(null, v);// already installed.
          
          n.fetch(v, function(err) {
            if(err) return cb(err);
            return cb(null, v);
          });
        });
        return;
      
      case 'latest':
        if(nodist.latest(available) === nodist.latest(installed))
          return cb(null, nodist.latest(installed));// already installed.
        
        n.fetch(nodist.latest(available), function(err) {
          if(err) return cb(err);
          return cb(null, nodist.latest(available));
        });
        return;
        
      case 'stable':
        if(nodist.latestStable(available) === nodist.latestStable(installed))
          return cb(null, nodist.latestStable(installed));// already installed.
        
        n.fetch(nodist.latestStable(available), function(err) {
          if(err) return cb(err);
          return cb(null, nodist.latestStable(available));
        })
        return;
        
      default:
        if(installed.indexOf(version) != -1)
          return cb(null, version);// already installed.
        
        n.fetch(version, function(err) {
          if(err) return cb(err);
          return cb(null, version);
        })
        return;
      }
      
    }