function(){
      if(this.options.path){
        return {
          url: NANO.api.routes[this.options.path],
          dataType: "json"
        };
      }else{
        return this.options.ajax_params;
      }
    }