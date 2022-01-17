function(options){
    this.file_types = options.file_types || this.file_types || [];

    if(!(this.file_types instanceof Array)) this.file_types = [this.file_types];
        
    if(this.file_types.length > 0){
      this.types.push('filetype');
    }
  }