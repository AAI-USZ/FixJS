function() {
        this.x = this.x + this.speed * Math.cos(this.angle);
        this.y = this.y + this.speed * Math.sin(this.angle);
        
        //if bullet is outside the screen
        if (this.x < 0 || this.x > cp.game.width || this.y < 0 || this.y > cp.game.height) {
          this.kill();
        }
    }