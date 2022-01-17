function() {
        var y = 90;
        y -= this.targetSpeed * 2;
        y += this.speed * 2;
        y = Math.min(160, Math.max(20, y));
        return y;
    }