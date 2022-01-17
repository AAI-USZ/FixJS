function(e) {
         if (e.keyCode === 37) {
            if (that.wallHit("left") === false){
               that.moveLeft();
            } else {
               console.log('wall hit');
            }
         } 

         if (e.keyCode === 39) {
            if (that.wallHit("right") === false){
               that.moveRight();
            } else {
               console.log('wall hit');
            }
         } 
      }