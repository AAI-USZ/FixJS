function(err, ls){
    if(err) return cb('Reading the version directory '+n.sourceDir+' failed: '+err.message);
    
    ls = ls.map(function(v) {
      return v.replace(/^(.+)\.exe$/, '$1');
    });
    ls.sort(function(val1, val2){
      return nodist.compareable(val1) > nodist.compareable(val2) ? 1 : -1;
    });
    return cb(null, ls);
  }