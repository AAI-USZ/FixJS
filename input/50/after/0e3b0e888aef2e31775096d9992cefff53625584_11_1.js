function(err, results){
    if(err) self.core.log.error({error:err, source:'Redis listContainsItems'});
    callback(results.indexOf(1) > -1, results);
  }