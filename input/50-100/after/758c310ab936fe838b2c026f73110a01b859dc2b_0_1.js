function(callback, context) {
          if (typeof callback != "function")
              throw new TypeError();
        
          for(var i in this) { 
		    if (typeof this[i] == "function") continue;
            callback.call(context, this[i], i, this);
          }
      }