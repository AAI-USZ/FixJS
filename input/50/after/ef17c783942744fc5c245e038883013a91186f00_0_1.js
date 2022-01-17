function(name, value) {
      this.__headers[name] = value;
      
      if(value === null){ //if no value is supplied, we delete the request header from the map
        delete this.__headers[name];
      }
    }