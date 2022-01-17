function(direction) {
      var coords = this.coords();
      console.log('coords: ', coords);
      for (var c = 0; c < 8; c += 2) {
         console.log(coords[c]);
         if (coords[c] === 0 && direction === "left") {
            return true;
         } else if (coords[c] === 9 && direction === "right") {
            return true;
         }        
      }
      return false;
   }