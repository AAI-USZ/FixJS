function(tank) {
      var cos, sin;
      this.graphics.setStrokeStyle(2, "round");
      this.graphics.beginStroke((tank.hit ? "#FF0000" : tank.color));
      this.graphics.drawCircle(tank.x, tank.y, tank.r);
      cos = Math.cos(tank.bearing);
      sin = Math.sin(tank.bearing);
      this.graphics.endStroke();
      this.graphics.setStrokeStyle(2, "round");
      this.graphics.beginStroke((tank.hit ? "#FF0000" : tank.color));
      this.graphics.moveTo(tank.x + -3 * cos - -3 * sin, tank.y + -3 * sin + -3 * cos);
      this.graphics.lineTo(tank.x + -3 * cos - 3 * sin, tank.y + -3 * sin + 3 * cos);
      this.graphics.lineTo(tank.x + (tank.r - 6) * cos - 3 * sin, tank.y + (tank.r - 6) * sin + 3 * cos);
      this.graphics.lineTo(tank.x + (tank.r - 6) * cos - -3 * sin, tank.y + (tank.r - 6) * sin + -3 * cos);
      this.graphics.lineTo(tank.x + -3 * cos - -3 * sin, tank.y + -3 * sin + -3 * cos);
      return this.graphics.endStroke();
    }