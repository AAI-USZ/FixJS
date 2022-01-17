function() {
        var y = 90;
        y -= this.targetAltitude * 4;
        y += this.altitude * 4;
        y = Math.min(160, Math.max(20, y));
        return y;
    }