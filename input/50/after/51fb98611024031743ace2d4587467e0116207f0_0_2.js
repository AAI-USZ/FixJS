function(err){
      console.log('putStream req error, calling cb %s', err);
      fn(err, null);
    }