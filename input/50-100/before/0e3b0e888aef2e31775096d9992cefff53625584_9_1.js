function(options){
    var self = this;

    this.times = options.times || this.times || [];  
    if(!(this.times instanceof Array)) this.times = [this.times];

    if(this.times.length > 0){

      this.misc_types.push('time');

      checkTime(self);

      setInterval(function(){      
        checkTime(self);
      }, 1000 * 60); //check the time every minute...
    }
  }