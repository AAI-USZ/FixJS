function() {
        var y = 90;
        y -= this.targetAltitude * 4;
        y += this.altitude * 4;
        y = Math.min(162, Math.max(16, y));
        return y;
    }