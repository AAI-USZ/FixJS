function(options, callback){  
  if(!options || !callback){
    throw new Error('options or callback missing!');
  }
  
  //add more...
  options.domain = url.parse(options.url).hostname;
  
  var self = this;
  
  async.forEachSeries(this.rules, function(rule, next){
    rule.isAllowed(options, function(result){
     
      //whitelisted
      if(result === true){
        callback(true, rule);
        self.log.info({
          allowed:true,
          rule:rule,
          options:options
        });
        
        next('done');
        return;
      }
      
      //Blocked. result = redirect url
      if(result){
        //replace placeholder (e.g. [domain]) with actual values
        var redirect = result.replace(/\[(.+?)\]/ig, function(a, field){
          if(options[field]) return options[field];
          if(rule[field]) return rule[field];
          return '';          
        });
        
        callback(redirect, rule);
        self.log.info({
          allowed:false,
          redirect:redirect,
          rule:rule,
          options:options
        });
        
        next('done');
        return;
      }
      
      next();
    });

  }, function(done){
    //Default... allow all! should be changed to deny all...
    if(!done){
      callback(true);
      self.log.info({
        allowed: true,
        rule: 'DEFAULT',
        options:options
      });
    }
  });
}