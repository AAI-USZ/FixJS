function(obstacle) {
      this.graphics.setStrokeStyle(4, "round");
      this.graphics.beginStroke("#000000");
      this.graphics.drawCircle(obstacle.x, obstacle.y, obstacle.r);
      return this.graphics.endStroke();
    }