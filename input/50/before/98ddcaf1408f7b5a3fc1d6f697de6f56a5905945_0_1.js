function(direction) {
      console.log("rotated");
      if (direction === "rRotate") {
         var popped = this.playPiece.pop();
         this.playPiece.unshift(popped);
      }
   }