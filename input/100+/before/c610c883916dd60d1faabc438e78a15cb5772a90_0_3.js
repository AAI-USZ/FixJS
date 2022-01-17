function(method) {
      var self = this;
      var args = arguments[1];
      $(self.elements).each(function(index, el){
        window.setTimeout(function(){
          method.call(self, index, args);
        }, self.options.delay * index);        
      });
    }