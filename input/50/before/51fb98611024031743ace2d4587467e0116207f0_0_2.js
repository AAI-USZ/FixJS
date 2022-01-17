function(err){
      console.error('putStream req error, calling cb');
      console.error(err);
      fn(err, null);
    }