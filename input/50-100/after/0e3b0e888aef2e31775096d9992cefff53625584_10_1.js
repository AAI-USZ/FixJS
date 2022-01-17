function(options){
    this.users = options.users || this.users || [];  
    if(!(this.users instanceof Array)) this.users = [this.users];
    
    if(this.users.length > 0){
      this.types.push('user');
    }
  }