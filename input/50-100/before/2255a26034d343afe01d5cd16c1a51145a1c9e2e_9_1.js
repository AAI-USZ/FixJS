function() {
        this.x = this.x + this.speed * Math.cos(this.angle);
        this.y = this.y + this.speed * Math.sin(this.angle);
    }