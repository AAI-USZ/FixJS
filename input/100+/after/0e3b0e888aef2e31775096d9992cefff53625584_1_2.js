function(){
  this.types = uniq(this.types);
  
  var self  = this;
  var tmp = [];
  
  for(var i in this.types){
    (function(type_method){
      tmp.push(function(callback){
        type_method.call(self, self.current_options, callback);
      });
    })(this.core.rule_types[this.types[i]]);
  }
  
  
  this.type_callbacks = function(options){
    self.current_options = options;    
    return tmp;
  };
  
}