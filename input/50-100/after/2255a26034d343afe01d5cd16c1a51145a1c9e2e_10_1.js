function() {
      if (this.path_points.length === 0) {
        this.kill();
        return;
      }
      
      var next_step = this.path_points.shift();
      
      this.x = next_step[0];
      this.y = next_step[1];
      
      if (cp.math.random(50,1) == 5) {
        cp.game.spawn('Bullet',this.x, this.y, 350, 350);
      }
    }