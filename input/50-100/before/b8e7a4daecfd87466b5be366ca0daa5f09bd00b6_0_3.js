function() {
      var coords = this.coords();
      for (var c = 0; c <= 8; c = c + 2) {
         if (coords[c] === 0 || coords[c] === 8) {
            return true;
         } else {
            return false;
         }
      } 

   }