function(options){
    this.matches = options.matches || this.matches || [];

    if(!(this.matches instanceof Array)) this.matches = [this.matches];
        
    if(this.matches.length > 0){
      
      this.types.push('match');
      
      var tmp = [];
      for(var i in this.matches){
        var match = this.matches[i];
        match = match.replace(/\./g, '\\.');
        match = match.replace(/\*/g, '.*');
        tmp.push(new RegExp(match));
      }
      this.matches = tmp;
    }
  }