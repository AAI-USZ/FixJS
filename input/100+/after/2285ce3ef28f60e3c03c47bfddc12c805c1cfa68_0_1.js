function() {
      //shoot randomly
      if (cp.math.random(50,1) == 5) {
        cp.game.spawn('Bullet',this.x, this.y, 350, 350);
      }
    }