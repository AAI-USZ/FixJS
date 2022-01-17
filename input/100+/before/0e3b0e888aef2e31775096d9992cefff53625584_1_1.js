function(options, core){
  
  this.name         = options.name || 'rule' + core.rules.length;
  this.allowed      = options.allowed || false;
  this.redirect     = options.redirect || core.redirect;
  this.mode         = options.mode || 'redirect';

  //Every rule can have multiple rule types (e.g. dest: category, match, src: group, user, ou)
  this.dest_types    = [];
  this.src_types     = [];
  this.misc_types    = [];
    
  this.core = core;
  this.log = this.core.log;
  
  for(var i in this.core.rule_configs){
    this.core.rule_configs[i].call(this, options);
  }
  
  this.sanitizeTypes();
  
}