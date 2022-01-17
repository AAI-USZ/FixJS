function(callback) {
         for (key in this) {
            if(callback(key, this[key]) === false) { return this; }
         }
         return this;
      }