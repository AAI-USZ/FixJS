function() {
      switch(this.style) {
        case 'hard': 
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
          break;
        //end hard
        
        default:
          switch(this.heading) {
            case 'right':
              if (this.x < 51) { //if drone has moved right far enough
                this.heading = 'down';
                this.y += this.speed;
              } else {
                this.x -= this.speed;
              }
              break;
            case 'down':
              if ((this.y % 50) < this.speed) { // if drone has moved down far enough
                if (this.x < (cp.core.width / 2)) { //if drone is on right side
                  this.heading = 'left';
                  this.x += this.speed;
                } else {
                  this.heading = 'right';
                  this.x -= this.speed;
                }
              } else {
                this.y += this.speed;
              }
              break;
            case 'left':
              if (this.x > (cp.core.width - 50)) { //if dron has moved left far enough
                this.heading = 'down';
                this.y += this.speed;
              } else {
                this.x += this.speed;
              }
          }
        //end default
      }
    }