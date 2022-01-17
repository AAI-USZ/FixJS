function() {
        var y = 90;
        y -= this.targetSpeed * 2;
        y += this.speed * 2;
        y = Math.min(162, Math.max(16, y));
        return y;
    }