function(callback, context) {
          if (typeof callback != "function")
              throw new TypeError();
        
          for(var i in this) { 
            callback.call(context, this[i], i, this);
          }
      }