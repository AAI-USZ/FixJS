function(options){
    this.ips = options.ips || this.ips || [];

    if(!(this.ips instanceof Array)) this.ips = [this.ips];

    if(this.ips.length > 0){
      
      this.dest_types.push('ip');
      
      var tmp = [];
      for(var i in this.ips){
        tmp.push(new Netmask(this.ips[i]));
      }
      this.ips = tmp;
    }
  }