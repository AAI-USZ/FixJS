function(err){
      if (err) return fn(err);
      if (fn)
        --count || fn();
    }