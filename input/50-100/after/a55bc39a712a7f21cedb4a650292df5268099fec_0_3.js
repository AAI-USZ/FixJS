function() {
      var that = this;
      document.onkeydown = function(e) {
         if (e.keyCode === 37) {
            if (that.collisionTest("left") === false){
               that.moveLeft();
            } else {
               console.log('left hit');
            }
         } 

         if (e.keyCode === 39) {
            if (that.collisionTest("right") === false){
               that.moveRight();
            } else {
               console.log('right hit');
            }
         } 
      }
   }