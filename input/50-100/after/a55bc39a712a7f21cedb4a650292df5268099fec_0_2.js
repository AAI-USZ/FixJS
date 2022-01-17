function(){
      if (this.collisionTest("down") === false) {
         this.moveDown();
      } else {
         console.log("side hit");
      }
   }