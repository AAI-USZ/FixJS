function(options){
    this.categories = options.categories || this.categories || [];  
    if(!(this.categories instanceof Array)) this.categories = [this.categories];
    
    if(this.categories.length > 0){
      this.dest_types.push('category');
    }
  }