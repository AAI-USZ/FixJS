function(options, core){
  
  this.name         = options.name || 'rule' + core.rules.length;
  this.allowed      = options.allowed || false;
  this.redirect     = options.redirect || core.redirect;
  this.mode         = options.mode || 'redirect';

  // Every rule type that needs to be asked is in that list (e.g. category, match, group)
  this.types = [];
    
  this.core = core;
  this.log = this.core.log;
  
  for(var i in this.core.rule_configs){
    this.core.rule_configs[i].call(this, options);
  }
  
  this.buildCallbackList();
  
}