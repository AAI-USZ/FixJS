function(err, results){
    if(err) self.core.log.error({error:err, source:'Redis containsDomain'});
    callback(results.indexOf(1) > -1);
  }