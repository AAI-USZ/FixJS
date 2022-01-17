function(e) {
         if (that.collisionTest() === false){
            if (e.keyCode === 37) {
               that.moveLeft();
            }
            if (e.keyCode === 39) {
               that.moveRight();
            }
         } else {
            console.log('wall hit');
         }
      }