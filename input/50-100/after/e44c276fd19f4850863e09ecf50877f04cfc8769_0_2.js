function(e) {
         if (that.wallHit() === false){
            if (e.keyCode === 37) {
               console.log('move left :',that.playPiece[0]);
               that.moveLeft();
            }
            if (e.keyCode === 39) {
               console.log(that.playPiece[0]);
               that.moveRight();
            }
         } else {
            console.log('wall hit');
         }
      }