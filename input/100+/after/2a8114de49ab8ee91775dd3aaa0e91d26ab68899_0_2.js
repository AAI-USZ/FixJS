function() {
      if (this.key.isDown(this.key.left)) {
         if (this.collisionTest("left") === false) {
            this.moveLeft();
         }
      }
      if (this.key.isDown(this.key.right)) {
         if (this.collisionTest("right") === false) {
            this.moveRight();
         }
      }
      if (this.key.isDown(this.key.up)) {
         console.log('pressed');
      }
      if (this.key.isDown(this.key.down)) {
         console.log('pressed');
      }
      //var that = this;
      //document.onkeydown = function(e) {
         //if (e.keyCode === 37) {
            //if (that.collisionTest("left") === false) {
               //that.moveLeft();
            //} else {
               //console.log('left hit');
            //}
         //} 

         //if (e.keyCode === 39) {
            //if (that.collisionTest("right") === false) {
               //that.moveRight();
            //} else {
               //console.log('right hit');
            //}
         //} 
         //if (e.keyCode === 65) {
            //if (that.collisionTest("rRotate") === false) {
               //that.rotate("rRotate");
            //} else {
               //console.log('rotate hit');
            //}
         //}
      //}
   }