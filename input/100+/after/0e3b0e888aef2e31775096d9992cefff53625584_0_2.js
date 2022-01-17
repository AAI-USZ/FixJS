function(ruledef){
  if(typeof ruledef == 'string'){
    //TODO check if exists. allow '*'
    ruledef = require('./rules/' + ruledef);
  }
  
  //Rule definitions for specific type (dest, src, misc)
  if(typeof ruledef.filter == 'function'){
    this.rule_types[ruledef.name] = ruledef.filter;
  }

  //Rule option parsing
  if(typeof ruledef.config == 'function'){
    this.rule_configs.push(ruledef.config);
  }
  
  //class extentions
  if(typeof ruledef.cache == 'object'){
    
    if(typeof ruledef.cache.purge == 'function'){
      this.purge_callbacks.push(ruledef.cache.purge);
    }
    
    for(var i in ruledef.cache){
      if(!this[i]){
        this[i] = ruledef.cache[i];
      }
    }
  }
}