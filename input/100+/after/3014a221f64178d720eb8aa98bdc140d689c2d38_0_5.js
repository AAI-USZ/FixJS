function Bullet(tank, power) {
      var i, j;
      this.tank = tank;
      this.power = power;
      i = Math.cos(this.tank.bearing);
      j = Math.sin(this.tank.bearing);
      this.r = 1 + this.power;
      this.power = Math.pow(2, 1 + this.power);
      this.x = this.tank.x + i * (tank.r + this.r - 6);
      this.y = this.tank.y + j * (tank.r + this.r - 6);
      this.vx = i * 200;
      this.vy = j * 200;
    }