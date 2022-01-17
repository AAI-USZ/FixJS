function(index, el){
        window.setTimeout(function(){
          method.call(self, index, args);
        }, self.options.delay * index);        
      }