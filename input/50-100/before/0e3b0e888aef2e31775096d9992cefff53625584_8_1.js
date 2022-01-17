function(options){
    this.ous = options.ous || this.ous || [];  
    if(!(this.ous instanceof Array)) this.ous = [this.ous];
    
    if(this.ous.length > 0){
      this.src_types.push('ou');
    }
  }