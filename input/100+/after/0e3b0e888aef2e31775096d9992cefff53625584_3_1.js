function(options){
    var self = this;
        
    this.categories = this.categories || [];
    this.domain_files = options.domain_files || this.domain_files || [];  
    if(!(this.domain_files instanceof Array)) this.domain_files = [this.domain_files];
    
    if(this.domain_files.length > 0){
      this.types.push('category');
      
      for(var i in this.domain_files){
        var path = this.domain_files[i];
        var name = this.core.name + ':' + this.domain_files[i].replace(/.*\/(.+?)/, '$1');
        
        if(path[0] != '/'){
          path = process.cwd() + '/' + path;
        }
        
        if(this.core.redis){
          this.core.redis.writeDomains(name, path, {watch: true}, function(err){
            if(err) self.log.error({error:err.message, source:'domain_files', rule: this});
          });
        }else{
          self.log.error({error:'Redis not configured!', source:'domain_files', rule: this});
        }
        
                
        this.categories.push(name);
      }
      
    }
    
  }