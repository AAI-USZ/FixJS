function(config){
  sharedInstance = this;
  
  this.config = config;

  this.rules = [];
  this.rules_cache = {};
  this.rule_configs = [];
  this.rule_types = {
    dest:{},
    src:{},
    misc:{}
  };
  this.purge_callbacks = [];
  this.loaded_rule_sources = [];
  
  this.name         = config.name || 'sentry';
  this.config       = config;
  this.redirect     = config.redirect;
  this.cache_time   = config.cache_time;
  this.rule_sources = config.rule_sources || ['config'];

  
  this.createLogger();
  
  this.log.info('Sentry started');
  
  //global exception handling!
  var self = this;
  //process.on('uncaughtException', function (err) {
  //  self.log.error({error:err, source:'uncaughtException'});
  //});
  
  
  if(config.ldap){
    this.setLdapConf(config.ldap);
  }
  
  if(config.redis){
    this.setRedisConf(config.redis);
  }
   
  this.addRuleDefinition('domain_file');
  this.addRuleDefinition('file_type'); 
  this.addRuleDefinition('category');
  this.addRuleDefinition('match');
  this.addRuleDefinition('time');
  this.addRuleDefinition('group');
  this.addRuleDefinition('user');
  this.addRuleDefinition('ou');
  this.addRuleDefinition('ip');
  
  this.loadRules(this.config.rules, 'config');
  
  if(this.cache_time){
    this.startPeriodicalPurge();
  }
  
}