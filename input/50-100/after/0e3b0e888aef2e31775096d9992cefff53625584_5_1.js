function(options){
    this.groups = options.groups || this.groups || [];  
    if(!(this.groups instanceof Array)) this.groups = [this.groups];
    
    if(this.groups.length > 0){
      this.types.push('group');
    }
  }