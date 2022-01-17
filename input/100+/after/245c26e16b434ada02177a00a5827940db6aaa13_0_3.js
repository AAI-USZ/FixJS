function(type){
      //First check if we are using a CDN which in that case we dont need to do all this.
      if(this.options.cdn_url) {
        return this.options.cdn_url;
      }
      
      if (type == "sql") {
         return this.options.sql_protocol + 
             "://" + ((this.options.user_name)?this.options.user_name+".":"")  + 
             this.options.sql_domain + 
             ((this.options.sql_port != "") ? (":" + this.options.sql_port) : "");
       } else {
         return this.options.tiler_protocol + 
             "://" + ((this.options.user_name)?this.options.user_name+".":"")  + 
             this.options.tiler_domain + 
             ((this.options.tiler_port != "") ? (":" + this.options.tiler_port) : "");
       }
    }