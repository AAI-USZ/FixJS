function(i, element){
      add(this, event, callback, null, function(fn, type){
        return function(){
          var result = fn.apply(element, arguments);
          remove(element, type, fn);
          return result;
        }
      });
    }