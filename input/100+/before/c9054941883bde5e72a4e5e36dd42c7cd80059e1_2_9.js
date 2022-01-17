function() {
        // stop any current animations
        this.set.stop();
        arrow.stop();
        // transform the entire thing, and apply an additional scale to the arrow
        this.set.transform(this.transformString());
        arrow.transform("...S"+this.arrowscale);
        // manually position the center point and the handle point
        this.centerPoint.setCoord(this.center);
        this.rotateHandle.setCoord([Math.sin((this.rotation - 85) * Math.PI / 180) * (r + 0.5) + this.center[0],
                                    Math.cos((this.rotation - 85)* Math.PI / 180) * (r + 0.5) + this.center[1]]);
    }