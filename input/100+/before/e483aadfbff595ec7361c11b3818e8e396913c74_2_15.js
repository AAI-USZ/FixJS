function(){
          var result = fn.apply(element, arguments);
          remove(element, type, fn);
          return result;
        }